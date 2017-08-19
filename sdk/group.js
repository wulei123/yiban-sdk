let request = require('request')
let request_error_check = require('./utils/request-error')
let log4js = require('log4js')
let logger = log4js.getLogger()
logger.level = 'debug'
/**
 * 群
 * @param {string} access_token
 * @class Group
 */
class Group{
    constructor(access_token){
        this.access_token = access_token
            
        this.public_group = new Set()
        this.organ_group = new Set()
        this.hot_topic = new Set()
        this.public_group_num = 0
        this.organ_group_num = 0
        this.hot_topic_num = 0
    }
    /**
     *  获取当前用户已加入的公共群。
     * 文档地址 https://o.yiban.cn/wiki/index.php?page=group/public_group
     * 
     * @param {number} [page=1] 
     * @param {number} [count=5] 
     * @param {any} callback 
     * @memberof Group
     */
    publicGroup(page=1, count=5, callback){
        if (typeof page === 'function'){callback = page; page = 1}
        let public_group_url = `https://openapi.yiban.cn/group/public_group?access_token=${this.access_token}&&page=${page}&&count=${count}`
        logger.debug('public_group_url : %s',public_group_url)
        request.get(public_group_url,(err, response, body)=>{
            if (err){throw err; return}
            let data = JSON.parse(body)
            let error = null
            if (request_error_check(data)){error = data}
            this.public_group.add(data.info.public_group)
            this.public_group_num = data.info.num
            if (callback){callback(error,data.info)}
        })
    }
    /**
     * 获取当前用户已加入的机构群
     * 文档参考 https://o.yiban.cn/wiki/index.php?page=group/organ_group
     * 
     * @param {number or function} [page=1] 页码(默认1)，当使用默认参数时，第一个参数可以为回调参数
     * @param {number} [count=15] 每页数据量（默认15，最大30）
     * @param {any} callback 
     * @memberof Group
     */
    organGroup(page=1, count=15, callback){
        if (typeof page === 'function'){callback = page; page = 1}
        let organ_group_url = `https://openapi.yiban.cn/group/organ_group?access_token=${this.access_token}&&page=${page}&&count=${count}`
        logger.debug('organ_group_url : %s',organ_group_url)
        request.get(organ_group_url,(err, response, body)=>{
            if (err){throw err; return}
            let data = JSON.parse(body)
            let error = null
            if (request_error_check(data)){error = data}
            this.organ_group.add(data.info.organ_group)
            this.organ_group_num = data.info.num
            if (callback){callback(error,data.info)}
        })
    }
    /**
     * 获取指定机构群/公共群信息。
     * 文档地址 https://o.yiban.cn/wiki/index.php?page=group/group_info
     * 
     * @param {string} group_id 
     * @param {any} callback 
     * @memberof Group
     */
    groupInfo(group_id,callback){
        let group_info_url =`https://openapi.yiban.cn/group/group_info?access_token=${this.access_token}&&group_id=${group_id}`
        logger.debug('group_info_url : %s',group_info_url)
        request.get(group_info_url,(err, response, body)=>{
            if(err){throw err; return}
            let data = JSON.parse(body)
            let error = null
            if (request_error_check(data)){error = data}
            if(callback){callback(error,data.info)}
        })
    }
    /**
     * 获取全站/机构号热门话题列表。
     * 文档地址 https://o.yiban.cn/wiki/index.php?page=group/hot_topic
     * 
     * @param {number  or functin?} [page=1] 
     * @param {number or fuunction?} [count=15] 
     * @param {any or function?} organ_userid 
     * @param {function?} callback 
     * @memberof Group
     */
    hotTopic(page = 1, count = 15, organ_userid='', callback){
        if (typeof page === 'function'){callback = page; page = 1}
        if (typeof count === 'function'){callback = count; count = 15}
        if (typeof organ_userid === 'function'){callback = organ_userid; organ_userid = ''}
        let hot_topic_url = `https://openapi.yiban.cn/group/hot_topic?access_token=${this.access_token}&&page=${page}&&count=${count}&&organ_userid=${organ_userid}`
        logger.debug('hot_topic_url : %s',hot_topic_url)
        request.get(hot_topic_url,(err, response, body)=>{
            if (err){throw err; return }
            let data = JSON.parse(body)
            let error = null
            if (request_error_check(data)){error = data}
            if (callback){callback(error,data.info)}
        })
    }
}
module.exports = Group