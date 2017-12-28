const express = require('express');
const crypto = require('crypto');
const query_user = require('../../model/back/auth');
const Auth_mdw = require('../../middlewares/auth');

const router = express.Router();

/////////////
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


router.post('/login',upload.single(), function(req,res) {   //ok

    req.checkBody("user_email", "Enter a valid email address.").isEmail();
    req.checkBody("user_password", "Password is required.").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

    var email = req.body.user_email;

    var password = req.body.user_password;

    query_user.login(email,password,req.body).then(user => {

       if(user == '') {
          
            res.send({ status: false, message: 'Login Gagal',data_admin: {} })
        
        } else {

              var user_status = user[0]['user_status'];

              if(user_status === 'block'){

                  var token_expired = "2017-09-19 01-09-10";

                  var token = crypto.createHash('md5').update(token_expired).digest('hex');

                  var id = user[0]['user_id'];

                    query_user.update(id,token,token_expired, req.body).then(user => {
                     
                    });

                res.send({ status: false, message: 'Login false', data_admin: {user} })

              }else{

                    res.send({ status: true, message: 'Login Berhasil',data_admin: user })

                }
           
         }

      });

    }

});


router.post('/register', upload.single('user_photo'), function(req, res, next){   //ketika dikirim melalui post harus user_foto 

    req.checkBody("user_level_id", "level id is required.").notEmpty(); 
    req.checkBody("user_name", "Name is required.").notEmpty(); 
    req.checkBody("user_email", "Enter a valid email address.").notEmpty().isEmail();
    req.checkBody("user_username", "Username is required").notEmpty();
    req.checkBody("user_password", "Password is required.").notEmpty();
    req.checkBody("user_status", "Status is required.").notEmpty();
   // req.checkBody("user_photo", "Photo is required.").notEmpty();
    req.checkBody("user_token", "Token is required.").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

      var images_name   = req.files;
      var user_level_id = req.body.user_level_id;  
      var user_name     = req.body.user_name;
      var user_email    = req.body.user_email;
      var user_username = req.body.user_username;
      var user_password = req.body.user_password;
      var user_status   = req.body.user_status;

      var user_photo    = req.file.filename;   //console.log(user_photo)
      var user_token    = req.body.user_token;

      //res.json(user_photo)

      query_user.create(user_level_id,user_name,user_email,user_username,user_password,user_status,user_photo,user_token,req.body).then(argument => {

        res.send({ status: true, message: 'Register Berhasil',data_admin: argument })


      });
    
    }

});


router.post('/cek', upload.single(), function(req, res){

    req.checkBody("user_token", "Token is required.").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

    var token = req.body.user_token;

    query_user.check_token(token, req.body).then(user => {

         if(user == '') {
            
              res.send({ status: false, text: 'token invalid' })
          
          } else{

              res.send({ status: true, text: 'token valid' })
          }

    });

  }

});


/*
MENGGUNAKAN MIDDLEWARES
router.post('/cek',Auth_mdw.check_token, function(req, res, next){

  query_user.getAll().then(user => {
    res.send({ status: true, message: 'Login Berhasil',data_admin: user })
    next();
  });

});

*/


module.exports = router;
