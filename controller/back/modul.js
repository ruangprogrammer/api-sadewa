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


router.post('/list', upload.single(),Auth_mdw.check_token, (req, res) => {

	   var id = req.body.user_id;   

     query_modul.getList(id).then(modul => {
    
      if(modul == ''){

     		  res.send({status:false,text:"tidak ada data sidebar", items: "array" })

  	   }else{

  		    res.send({status:true,text:"side bar ditemukan",items:modul})

  	}

  });

});

module.exports = router;
