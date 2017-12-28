const express = require('express');
const crypto = require('crypto');
const query_rfi = require('../../model/back/rfi'); 
const Auth_mdw = require('../../middlewares/auth');
const router = express.Router();


/////////////
const multer   = require('multer');
const multerS3 = require('multer-s3');
//const path = require('path');
const fs         = require('fs');
const gm    = require('gm').subClass({imageMagick:true});

var storage = multer.diskStorage({
    destination : function(req, file, cb ){
      cb(null, 'media/images/products/original/');
    },
    filename : function(req, file, cb){
      cb(null, 'product_' + file.fieldname + '-' + Date.now() + '.jpg');
    }
});
var upload = multer({ storage: storage});//.single('image');




router.post('/list',  upload.any('image'), function(req, res, next){   

  query_rfi.getList().then(rfi => {
    res.send({status: true, text: 'data rfi found', data_rfi: rfi})
  });

});


router.post('/add_message',  upload.any('image'), function(req, res){   

  var quotation_id = req.body.quotation_id;
  var qm_text = req.body.qm_text;  
  var qm_user_id = req.body.qm_user_id;

 // console.log(qm_user_id)
  //var file_n = req.file;

  query_rfi.addRfi(quotation_id,
                   qm_text,
                   qm_user_id).then(rfi => {
    res.send({status: true, text: 'add message success'})
  });

});


router.post('/detail',  upload.any('image'), function(req, res){   

  var quotation_rfi_number = req.body.quotation_rfi_number;

  query_rfi.detail(quotation_rfi_number).then(rfi => {
    res.send({status: true, text: 'detail rfi found', data_rfi: rfi, quotation_id: rfi[0]['quotation_id'], quotation_rfi_number: quotation_rfi_number})
  });

});




module.exports = router;
