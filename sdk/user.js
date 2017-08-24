let request = require('request')
let log4js = require('log4js')
let logger = log4js.getLogger()
logger.level =  'debug'

/**
 * @param access_token
 * 
 * @class User
 */
class User {
    constructor(access_token){
        this.access_token = access_token
        this.info = null
        this.verify_info = null
    }
    /**
     * 获取当前用户基本信息
     * 
     * @param {function(info)} callback 
     * @memberof User
     */
    me(callback){
        let user_me_url = `https://openapi.yiban.cn/user/me?access_token=${this.access_token}`
        request.get(user_me_url, (err, response, body)=>{
            if (err){ logger.error(err) ; return}
            let data = JSON.parse(body)
            let error = null
            if (data.status === 'error'||data.code) {
                error = data
                logger.error(data);
            }else{
                this.info = data.info
            }
            if (callback) {callback(error,this.info)}
        })
    }
    /**
     *     获取当前用户校方认证信息。
     * @callback (err:error, verify_info:object)
     * @param {callback} callback
     * @memberof User
     */
    verifyMe(callback){
        let verify_me_url = `https://openapi.yiban.cn/user/verify_me?access_token=${this.access_token}`
        request.get(verify_me_url, (err, response, body)=>{
            if (err) {logger.error(err); return}
            let data = JSON.parse(body)
            let error = null
            if (data.status === 'error' || data.code){
                error = data
                logger.error(data)
            }else{
                this.verify_info = data.info
            }
            if (callback) {callback(error, this.info)}
        })
    }
}


module.exports = User