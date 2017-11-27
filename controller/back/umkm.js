const express = require('express');
const crypto = require('crypto');
const query_umkm = require('../../model/back/umkm');
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





router.post('/add_umkm', function(req,res){

  req.checkBody("merchant_type", "Name is required.").notEmpty(); 
  req.checkBody("merchant_name", "Merchant Name is required.").notEmpty(); 
  req.checkBody("merchant_address", "User Address is required.").notEmpty(); 
  req.checkBody("merchant_email", "Merchant Email is required.").notEmpty(); 
  req.checkBody("merchant_phone", "Merchant Pone is required.").notEmpty(); 
  req.checkBody("merchant_desc", "Merchant Desc is required.").notEmpty(); 
  req.checkBody("merchant_city", "Merchant City is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

      var merchant_type = req.body.merchant_type;
      var merchant_name     = req.body.merchant_name;
      var merchant_address    = req.body.merchant_address;
      var merchant_email    = req.body.merchant_email;
      var merchant_phone    = req.body.merchant_phone;
      var merchant_desc    = req.body.merchant_desc;
      var merchant_status =  req.body.merchant_status;
      var merchant_city    = req.body.merchant_city;

      //var user_token    = "ekjrkedfs";

      query_umkm.create(merchant_type,
                        merchant_name,
                        merchant_address,
                        merchant_email,
                        merchant_phone,
                        merchant_desc,
                        merchant_status,
                        merchant_city).then(merchant => {
        res.send({status: true, text: 'umkm added success'});
      });
    
    }

});



router.get('/list_umkm', (req, res, next) => {

  query_umkm.getMerchant().then(umkm => {
    res.send({ status: true, text: 'data merchant found ',data_merchant: umkm })
    next();
  });


});


module.exports = router;
