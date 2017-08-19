function requestErrorCheck(data){
    if (data.status === 'error'||data.code){return true}else{return false}
}
module.exports = requestErrorCheck