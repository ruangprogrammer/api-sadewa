const express = require('express');
const crypto = require('crypto');
const query_modul =  require('../../model/back/modul');
const Auth_mdw = require('../../middlewares/auth');
const router = express.Router();


const multer  = require('multer');
const storage = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'media/images/');
      },
      filename : function(req, file, cb){
        cb(null,'user_'+Date.now() + file.originalname);
      }
});

const upload = multer({ storage:storage});


router.post('/list_old', upload.single(), (req, res) => {


    req.checkBody("user_level_id", "user_level_id is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
	   var id = req.body.user_level_id;   

     query_modul.getList(id).then(modul => {
      
        if(modul == ''){

       		  res.send({status:false,text:"tidak ada data sidebar", items: "array" })

    	   }else{

    		    res.send({status:true,text:"side bar ditemukan",items:modul})

    	}

    });

   }

});


router.post('/list', upload.single(), (req, res)=>{

    req.checkBody("user_level_id", "user_level_id is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
  
    let user_level_id       = req.body.user_level_id

    query_modul.user_modul(user_level_id).then((responses)=>{
      /*  let items = []
        let module = []
        items.push(responses)
        if (responses.length > 0){
            module.push({status:true, text:"data module found", data_module:items[0]})
        } else {
            module.push({status:false, text:"data module found", data_module:[]})

        }*/
         res.send({status: true, text: "side bar ditemukan", items: responses})
      // res.json(responses);
    })

  }

});


router.post('/access', upload.single(), (req, res)=>{

     query_modul.getAll().then((responses)=>{

        res.send({status: true, text: "modul ditemukan", items: responses})
        
    })

})

module.exports = router;
