let express = require('express')
let session = require('cookie-session')
let YiBan = require('../index')


let app = express()
app.use(session({name : 'session',keys:['code']}))
const client_id = 'bfad2801ca13ca77'
const client_secret = 'b82ff070e37acf1a01d9cc31018702b1'
const redirect_url = 'http://localhost:8089'
const state = ''
let yb = new YiBan(client_id,client_secret , redirect_url, state)


app.get('/',(req,res,next)=>{
    yb.authorize(req,res,(err,code)=>{
        res_data = {}
        res_data.code = code
        console.log('code : '+code)
        yb.getAccessToken((err, access_token)=>{
            if(err){console.log(err);return}
            res_data.access_token = access_token
            console.log('access_token : '+access_token)
            yb.user().me((err,info)=>{
                res_data.info = info
                console.log(res_data)
                yb.group().organGroup((err,info)=>{
                    yb.group().groupInfo(info.organ_group[0].group_id,(info)=>{
                        console.log(info)
                    })
                    yb.group().hotTopic((err,info)=>{
                        console.log(info)
                    })
                    console.log(info)
                })
            })
            
        })
    })
    res.end('test')
})
app.get('/getAT',(req,res,next)=>{
    yb.getAccessToken((err,access_token)=>{
        res.end('access_token: '+yb.access_token)
    })
})
app.get('/at',(req, res, next)=>{
    res.end('access_token : '+yb.access_token)
})
app.get('/user/me',(req, res, next)=>{
    yb.user().me((info)=>{
        res.end(info)
    })
})
app.listen(8089,()=>{
    console.log('app running on port 8089')
})