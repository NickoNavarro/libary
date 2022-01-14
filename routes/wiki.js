let express = require('express')
let router = express.Router()


router.get('/',function(req,res){// cuidado aqui si pones /wiki tienes que poner en el navegador wiki wiki
    
    res.send('Wiki home page')

})

router.get('/about',function(req,res){

    res.send('About this wiki')
    
})

router.post('/about',function(req,res){
    
    res.send('About this wiki post')

})
module.exports = router