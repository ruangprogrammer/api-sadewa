const express = require('express');
const crypto = require('crypto');
const query_user = require('../../model/back/user');
const Auth_mdw = require('../../middlewares/auth');
const router = express.Router();

/////////////
const multer  = require('multer');
const storage = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'uploads/users/');
      },
      filename : function(req, file, cb){
        cb(null,Date.now() + file.originalname);
      }
});

const upload = multer({ storage:storage});



router.post('/user_add', function(req,res){

  req.checkBody("user_level", "Name is required.").notEmpty(); 
  req.checkBody("user_name", "User Level is required.").notEmpty(); 

 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

      var user_name     = req.body.user_name;
      var user_level    = req.body.user_level;  
      var module_id     = 97777;
      var user_token    = "ekjrkedfs";

      query_user.create(user_name,user_level,module_id).then(user => {
        res.send({status: true, text: 'user level added success'});
      });
    
    }

});


router.post('/user_edit', (req, res, next) => {
  var user_level_id = req.body.user_level_id;  

  let data = [];
  query_user.getUseEditLevel(user_level_id).then(user => {

    user.map((x,i)=>{
      data.push(x.module_id)
    })

    res.send({ status: true, text: 'data User ',data_level: data})


    next();
  });


});


router.post('/user_save', (req, res) => {
  
  var user_level_id = req.body.user_level_id;  
  
  var module_id = JSON.parse(req.body.module_id);

 // var module_id = req.body.module_id;
  //res.send(JSON.parse(module_id))


  query_user.user_save(user_level_id,module_id).then(user => {

    res.send({ status: true, text: 'update success'})

   // next();

  });


});



router.post('/userlevel', (req, res, next) => {

  query_user.getUserLevel().then(user => {
    res.send({ status: true, text: 'data User ',data_level: user })
    next();
  });


});



router.post('/access', (req, res, next) => {

  query_user.getUserAll().then(user => {
    res.send({ status: true, text: 'Items ',data: {items :user} })
    next();
  });


});



module.exports = router;
