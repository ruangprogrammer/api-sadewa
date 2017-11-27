const express = require('express');
const crypto = require('crypto');
const query_admin =  require('../../model/back/admin');
const Auth_mdw = require('../../middlewares/auth');
const router = express.Router();
const secret = 'sadewainternasional';
var session_store;



router.post('/oke',Auth_mdw.check_token,  function(req, res, next) {

   res.json("Anda berhak untuk mengakses data ini.");
   //res.send({ error: true, message: 'test login Users' })

});


router.post('/add_admin', function(req,res){

	req.checkBody("user_level_id", "User Level is required.").notEmpty(); 
/*    req.checkBody("user_name", "Name is required.").notEmpty(); 
    req.checkBody("user_email", "Enter a valid email address.").notEmpty().isEmail();
    req.checkBody("user_username", "Username is required").notEmpty();
    req.checkBody("user_password", "Password is required.").notEmpty();*/
 

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

      var user_level_id = req.body.user_level_id;  
      var user_name     = req.body.user_name;
      var user_email    = req.body.user_email;
      var user_username = req.body.user_username;
      var user_password = req.body.user_password;
  

      query_admin.create(user_level_id,user_name,user_email,user_username,user_password).then(user => {
        res.json(user);
      });
    
    }


});


router.post('/list_admin', (req, res) => {


  query_admin.getAll().then(admin => {
    
    res.send({ status:true, text:"admin_found", data_admin: admin })

  });

});

module.exports = router;
