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
      var user_token    = "ekjrkedfs";

      query_user.create(user_level,user_name).then(user => {
        res.send({status: true, text: 'user level added success'});
      });
    
    }

});



router.get('/userlevel', (req, res, next) => {

  query_user.getUserLevel().then(user => {
    res.send({ status: true, text: 'data User ',data_level: user })
    next();
  });


});


module.exports = router;
