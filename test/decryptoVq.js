let YiBan = require('../index')

let yb = new YiBan('484b6cb2a841acbd','b419227786ef48b206a690f97c2cddf5','','')

yb.decryptoVerifyRequest(
    '7eb0fbcf6f5e9a0782d74199169ae4b7a59d88d198f68e1fed6d8e84fcfef2c8b1695af8ac8636ff8ab35d754a9557e603ef7b0a450897b69f6d8a386f52cbe299c07393aaa14f7980a13d84e964a20e239562210939b6cf3531d8b4eafa9dd4e9aeea6203393432393fd573c8b26ffa9d27b282279ea6f0ab8b781cfc542c1cfdbb278e8ed3d8a97504271ddef4312e1d70a77174b2712861290b28a596a7a2b5833c9e7c26d9e630da9b4f0bd727f491d73b9aa86a925b50771b4de4f7acf14991eb3bdbc08a3efe2b86d352f74c09671dccdd892054b1a823a36435c53f32755877eedd8766f90d6773eb8174ca36',
    (err, vq_info)=>[
        console.log(vq_info)
    ])

yb.user().verifyMe((err, verify_info)=>{
    if (err) {console.log(err) ;return}
    console.log(verify_info)
})
// let data = JSON.parse('{"visit_time":1503386691,"visit_user":{"userid":"6010363"},"visit_oauth":false}')
// console.log(data)