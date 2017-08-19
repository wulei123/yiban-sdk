let request = require('request')
let log4js = require('log4js')
let user = require('./sdk/user')
let group = require('./sdk/group')
let logger = log4js.getLogger()
logger.level =  'debug'
const access_token_url = 'https://openapi.yiban.cn/oauth/access_token'
/**
 * @param client_id 	应用appkey
 * @param client_secret 应用appsecret
 * @param redirect_uri 应用回调地址
 * @param state 防跨站伪造参数，重定向回应用端时会带上此参数。也可用于记录应用端自定义的功能标示（避免使用“? = &”等特殊字符）
 * 
 * @class YiBanOauth
 */
class YiBanSdk {
    constructor(client_id,client_secret, redirect_uri, state){
        this.client_id = client_id
        this.client_secret = client_secret
        this.redirect_uri = redirect_uri
        this.state = state
        this.authorize_url = `https://openapi.yiban.cn/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&state=${this.state}`
        this.code = null
        this.access_token = null
        this.user_id = null
        this.expires = null
    }
    /**
     * 跳转方式获取code 目前只适用于express
     * 
     * @param {any} req 
     * @param {any} res 
     * @param {function(code,authorize_url)?} 回调函数，可为空，参数为code 
     * @memberof YiBanOauth
     */
    authorize(req, res, callback){
        if (!this.authorize_url){
            logger.error('Authorize url is empty, please confirm the YiBanOauth has been initialed')
            return
        }
        if (req.query.code){this.code = req.query.code;logger.debug('Code saved')}
        if (!this.code){res.redirect(this.authorize_url)}
        if (callback){callback(this.code,this.authorize_url)}
    }
    /**
     * 当跳转认证时，不必要显式传入code，第一个参数可以是callback
     * 
     * @param {function or string} code 
     * @param {function} callback 
     * @memberof YiBanOauth
     */
    getAccessToken(code,callback){
        if (!this.code&&!code){
            logger.error('code can not be empty')
            return
        }
        if(!this.code && code){
            this.code = code
        }
        if(typeof code === 'function'){
            callback = code
        }
        let form_data = {client_id: this.client_id,client_secret: this.client_secret, code: this.code, redirect_uri: this.redirect_uri}
        console.log(form_data)
        request.post(access_token_url,{form: form_data},(err, res, body)=>{
            let body_data = JSON.parse(body)
            let error = null
            console.log(body_data)
            if (body_data.status === 'error'||body_data.code){
                logger.error(body_data)
                error = body_data
                if(body_data.code === 'e005'){this.code = null}
            }else{
                this.access_token = body_data.access_token
                this.user_id = body_data.userid
                this.expires = body_data.expires
                logger.debug('access_token: %s',this.access_token)
            }
            if (callback){callback(error,this.access_token)}
            return
        })
    }/**
     * 返回用户对象
     * 
     * @param {string?} access_token 
     * @returns {user} 
     * @memberof YiBanSdk
     */
    user(access_token){
        if (access_token){return new user(access_token)}
        return new user(this.access_token)
    }
    group(access_token){
        if (access_token){return new group(access_token)}
        return new group(this.access_token)
    }
}

module.exports = YiBanSdk