const express = require('express');
//const crypto = require('crypto');
const query_customer =  require('../../model/back/customer');
const Auth_mdw = require('../../middlewares/auth');
const config = require('../../config');
const router = express.Router();


const multer   = require('multer');
const multerS3 = require('multer-s3');
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



router.post('/count', (req,res) =>{

 query_customer.getListCustomer().then(customer => {

     // var a = count(customer.length);
      var b = "test";
      //  console.log(customer)

    //res.send({ status: true, text: 'data_customer', data_customer: customer })

  });


})


router.post('/list_customer', (req, res) => {

  var begin_index = req.body.begin_index;    console.log(begin_index)

  query_customer.getListCustomer(begin_index).then(customer => {
    //res.send(customer)

    res.send({ status: true, text: 'data_customer', data_customer: customer.data_customer, data_count: customer.data_count  })

  });

});



router.post('/detail_customer',  upload.any('image'), function(req, res, next){  

   var id = req.body.customer_id; 

   console.log(id)

  query_customer.getCustomerId(id).then(customer => {

    res.send({ status: true, text: 'detail customer', detail_customer: customer })

  });

});

module.exports = router;
