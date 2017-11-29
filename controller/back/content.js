const express = require('express');
const crypto = require('crypto');
const query_content =  require('../../model/back/content');
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


router.post('/add_category', upload.single(),Auth_mdw.check_token, (req, res) => {

     var id = req.body.user_id;   

     query_modul.getList(id).then(modul => {
    
      if(modul == ''){

          res.send({status:false,text:"tidak ada data sidebar", items: "array" })

       }else{

          res.send({status:true,text:"side bar ditemukan",items:modul})

    }

  });

});


router.post('/add_content', upload.single(),Auth_mdw.check_token, (req, res) => {


  //return knex.row('select * from _content');

  //return knex('_content');
   /*  var id = req.body.user_id;   

     query_modul.getList(id).then(modul => {
    
      if(modul == ''){

          res.send({status:false,text:"tidak ada data sidebar", items: "array" })

       }else{

          res.send({status:true,text:"side bar ditemukan",items:modul})

    }

  });*/

});


router.post('/list_content', upload.single(),Auth_mdw.check_token, (req, res) => {

     var id = req.body.section;   

     query_content.listContent(id).then(content => {
    
      if(content == ''){

          res.send({status:false,text:"data content not found", data_content: [] })

       }else{

          res.send({status:true,text:"data content found",data_content:content})

    }

  });

});


router.post('/list_category', upload.single(),Auth_mdw.check_token, (req, res) => {  //DONE

     var id = req.body.section;   

     query_content.listCategory(id).then(content => {  
    
      if(content == ''){

          res.send({status:false,text:"data content not found", data_content: [] })

       }else{

          res.send({status:true,text:"data content found",data_content:content})

    }

  });

});

module.exports = router;
