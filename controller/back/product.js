const express = require('express');
const crypto = require('crypto');
const query_product = require('../../model/back/product'); 
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

/*    a. list category                         oke
      b. add_category_product                  urung
      c. parent_category                       urung
      d. child_category                        urung
      e. add_product                           oke
      f. detail_product                        
      g. detail_edit                           urung
      h. select_cat_lang                       ok
      i. list_cat_lang                         OK
      j. product_unit                          OK      */

router.post('/list_product_category', function(req, res, next){

  query_product.getListCategory().then(product => {
    res.send({status: true, text: 'category ditemukan', data_cat: product})
  });

});




router.post('/detail_product', function(req, res, next){

    var id = req.body.product_id;
    query_product.getProductID(id,req.body).then(detail_product => {
    res.send({status: true, text: 'data product founds', data_prod: detail_product})
  });

});

router.post('/detail_edit', function(req, res, next){

 /*   var id = req.body.product_cat_id;

    query_product.getSelectCatLang(id,req.body).then(select => {
    res.send({status: true, text: 'country found', data_country: select})
  });*/

});


router.post('/select_cat_lang', function(req, res, next){

    var id = req.body.product_cat_id;

    query_product.getSelectCatLang(id,req.body).then(select => {
    res.send({status: true, text: 'country found', data_country: select})
  });

});


router.post('/list_cat_lang', function(req, res, next){

    query_product.getCatLang().then(cat => {
    res.send({status: true, text: 'cattegory list found', cat_data: cat})
  });

});



router.post('/product_unit', function(req, res, next){

    query_product.getProductUnit().then(product => {
    res.send({status: true, text: 'unit found', data_data: product})
  });

});


router.post('/create', upload.any('image'),  function(req,res, next){

    req.checkBody("product_merchant", "merchant id is required.").notEmpty(); 
    req.checkBody("product_name", "product name is required.").notEmpty(); 
    req.checkBody("product_sort_desc", "product short description is required").notEmpty();
    req.checkBody("product_description", "product description is required").notEmpty();
    req.checkBody("product_category", "product category is required.").notEmpty();
    req.checkBody("product_price", "product price min range is required.").notEmpty();
    req.checkBody("product_insurance", "product insurance is required.").notEmpty();
    req.checkBody("product_status", "product status is required.").notEmpty();
    req.checkBody("product_tag", "product tags is required.").notEmpty();
//    req.checkBody("user_token", "Token is required.").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {
      
      var merchant_id                     = req.body.product_merchant;
      var product_name                    = req.body.product_name;
      var product_shortdesc               = req.body.product_sort_desc;
      var product_desc                    = req.body.product_description;
      var product_cat_id                  = req.body.product_category;
      var product_price_min_range         = req.body.product_price;
      var product_is_insurance            = req.body.product_insurance;
      var product_status                  = req.body.product_status;
      var product_tags                    = req.body.product_tag;
      var images                          = req.files;
      var media_name = req.body.product_name;
      var media_value  = req.files;//body.product_name;
      ///var media_value = [];

     /* req.files.forEach(data => {
        var  array_media_value = data.filename;
        media_value.push(array_media_value);
        //console.log(a);
      });*/

     // console.log();
      //console.log(images);

     // console.log(images);

    /* var images_show = [];

      for (var i = 0 ; i< images.length ; i++) {

          var value_images = images[i]['filename'];
       
          images_show.push(value_images);
      }
    

      var b = images_show;
      
      var media_name  = "test" ;
      var media_value = b;*/

     // console.log(media_value);

      query_product.create(merchant_id,
                           product_name,
                           product_shortdesc,
                           product_desc,
                           product_cat_id,
                           product_price_min_range,
                           product_is_insurance,
                           product_status,
                           product_tags,
                           media_name,
                           media_value
                          ).then(product => {
         // res.send({ status: true, message: 'Data Berhasil disimpan !!!' });

      });

      //risize start  640 640
    }

      req.files.forEach(data => {

            gm(data.path)
            .resize(300, 300, '!')
            .gravity("Center")
            .extent(300,300)
            .noProfile()
            .write('./media/images/thumbs/product_thumbs' + Date.now()+data.originalname+'.jpg', function (err) {
              res.end();
            })

      })   

      req.files.forEach(data => {

            gm(data.path)
            .resize(800, 800, '!')
            .gravity("Center")
            .extent(800,800)
            .noProfile()
            .write('./media/images/products/products_640X640' + Date.now()+data.originalname+'.jpg', function (err) {
              res.end();
            })

      })   

     res.send({ status: true, text: 'add product success' });


});





router.post('/show', function(req, res, next){

   query_product.getShow().then(product => {

      res.json(product);

  });

});

//})
    //console.log(req.files);

     /* gm(req.file.path)
      .resize(240, 240, '!')
      .gravity("Center")
      .extent(240,250)
      .noProfile()
      .write('./media/images/thumbs/250/product_oke.jpg', function (err) {
        //console.log(err);
        res.json("amazinnggg")
      })*/


//});

// TEST DONE



/*
router.post('/test092', upload, function(req,res){

//res.json('data Berhasil disimpan');
 gm(req.file.path)
      .resize(240, 240, '!')
      .gravity("Center")
      .extent(240,250)
      .noProfile()
      .write('./media/images/thumbs/250/product_oke.jpg', function (err) {
        //console.log(err);
        res.json("amazinnggg")
      })
     
});*/



/*router.post('/create', upload.any(), function(req,res, next){

//res.json("ok")
req.files.forEach(data => {

  res.json(data.path);*/
  //gm(data.path)
 // .resize(200,200,'^')
/*  .write('media/products/250/' + Date.now() , err => { 
   console.log(err)
  })*/
//})


//console.log((anu => anu + 'ya')('anu'))

//console.log(req.files);
  /*if (req.files.image_url) {
   compressAndResize('media/images/products/' + req.files.image_url.name);
  }*/
  
//var path = require('path');

/*  gm('media\\images\\thumbs\\15106520947270_34f9608c-6afd-4348-8d7e-c1f58e593a29_717_905.jpg')
.resize(240, 240, '^')
.write('media\\images\\thumbs\\250\\15106520947270_34f9608c-6afd-4348-8d7e-c1f58e593a29_717_905aisyah.jpg', function (err) {
  if (!err)//{
    console.log('tidak error');
  });
*/


 //
 // }
 /* else{
     console.log('error ');
  }*/
//});
/*res.json(req.files);
  var width = 250;
  var height = 250; 
  gm(req.file.path)
  .resize(width,height,'^')
  .gravity('Center')
  .extent(width,height)
  .noProfile()
  .write('./media/images/thumbs/250/'+ req.file.fieldname + '-' + Date.now(), function(oke){
    if(!ok){
      res.json('Image upload complete');
    }
  })*/

  
/*
  if (req.files.image_url) {
    compressAndResize('media/images/thumbs/' + req.files.image_url.name);
  }
*/
 //  res.json("Data Berhasil disimpan");
  


     /* var merchant_id                     = req.body.product_merchant;
      var product_name                    = req.body.product_name;
      var product_shortdesc               = req.body.product_sort_desc;
      var product_desc                    = req.body.product_description;
      var product_cat_id                  = req.body.product_category;
      var product_price_min_range         = req.body.product_price;
      var product_is_insurance            = req.body.product_insurance;
      var product_status                  = req.body.product_status;
      var product_tags                    = req.body.product_tag;
      var images                          = req.files;

      var images_show = [];

      for (var i = 0 ; i< images.length ; i++) {

          var value_images = images[i]['filename'];
       
          images_show.push(value_images);
      }
    

      var b = images_show;
      
      var media_name  = "test" ;
      var media_value = b;

      query_product.create(merchant_id,
                           product_name,
                           product_shortdesc,
                           product_desc,
                           product_cat_id,
                           product_price_min_range,
                           product_is_insurance,
                           product_status,
                           product_tags,
                           media_name,
                           media_value
                          ).then(product => {
           res.send({ status: true, message: 'Data Berhasil disimpan !!!' });

      });*/


//});


/*
router.post('/uploads', upload.any(), function(req,res, next){


  res.send(req.files);



});



router.get('/show', function(req, res, next){

   query_user.getShow().then(product => {

      res.json(product);

  });

});*/

 // console.log(req.file.path)
 //console.log(req.file.fieldname)
/*  var width = 250;
  var height = 250;*/
 // gm(req.file.path)
  /*.resize(width, height, '^')
  .gravity("Center")
  .extent(width, height)
  .noProfile()
  .write('./media/images/thumbs/250/'+ req.file.fieldname + '-' + Date.now(), function(err){

    console.log(err);
    
  })*/

//});
//console.log(upload);
/*router.post('/create', upload.array(), function (req, res, next) {
  // req.body contains the text fields
res.json("skhdkjsdsd");

//  res.send(req.files);

      req.checkBody("user_email", "Enter a valid email address.").isEmail();
    //  req.checkBody("user_password", "Password is required.").isAlpha();

      var errors = req.validationErrors();
      if (errors) {
        res.send(errors);
        return;
      } else {
      var a = req.body.user_email;
      res.json(a);
    }


});
*/

//var path = require('path');
// require the image editing file
//var editor = path.resolve(__dirname, '../editor.js');

/*function compressAndResize (imageUrl) {
  // We need to spawn a child process so that we do not block 
  // the EventLoop with cpu intensive image manipulation 
  var childProcess = require('child_process').fork(editor);
  childProcess.on('message', function(message) {
    console.log(message);
  });
  childProcess.on('error', function(error) {
    console.error(error.stack)
  });
  childProcess.on('exit', function() {
    console.log('process exited');
  });
  childProcess.send(imageUrl);
}
*/

module.exports = router;
