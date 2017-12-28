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

var storage_cat = multer.diskStorage({
    destination : function(req, file, cb ){
      cb(null, 'media/');
    },
    filename : function(req, file, cb){
      cb(null, 'product_' + file.fieldname + '-' + Date.now() + '.jpg');
    }
});
var upload_cat = multer({ storage: storage_cat});//.single('image');





/*    a. list category                         oke
      b. add_category_product                  oke
      c. parent_category                       urung
      d. child_category                        urung
      e. add_product                           oke
      f. detail_product                        oke
      g. detail_edit                           progress
      h. select_cat_lang                       ok
      i. list_cat_lang                         OK
      j. product_unit                          OK      */

router.post('/list_product_category',  upload.any('image'), function(req, res, next){   //OKE

  query_product.getListCategory().then(product => {
    res.send({status: true, text: 'category ditemukan', data_cat: product})
  });

});


router.post('/add_category_product',  upload.any('image'), function(req, res, next){   //OKE

   var  product_cat_parent = req.body.cat_parent;
   var  product_cat_level =  req.body.cat_level;
   var  product_cat_desc = req.body.cat_desc;
   var  product_cat_status = req.body.cat_status;
   var  product_cat_name = req.body.cat_name;

   var image = req.files;
   var  product_cat_image = image[0].filename;
  //  console.log(image[0].filename)


   query_product.addCategoryProduct(product_cat_parent,
                                      product_cat_level,
                                      product_cat_image,
                                      product_cat_desc,
                                      product_cat_status,
                                      product_cat_name).then(product_cat => {

        if(product_id == ''){

             res.send({status: false, text: 'failed to add category'})

         }else{

             res.send({status: true, text: 'successfully added category'})

      }
   
  
  });

});


router.post('/list_product',  upload.any('image'), function(req, res, next){   //OKE

  query_product.getListProduct().then(product => {
    res.send({status: true, text: 'data product found', data_product: product})
  });

});


router.post('/detail_product', upload.any('image'), function(req, res, next){   //OKE

    var id = req.body.product_id;
    query_product.getProductID(id,req.body).then(detail_product => {
    res.send({status: true, text: 'data product founds', data_prod: detail_product})
  });

});



router.post('/detail_edit', upload.any('image'), function(req, res, next){

    var id = req.body.product_id;   //console.lo

    query_product.getDetailEdit(id).then(prod_detail => {

    res.send({status: true, text: 'data product found', data_prod: prod_detail})

  });

   //var numbers =[ 1, 2, 3];

   //var data = 10;

//    numbers.push(data);
    //numbers = "123333333333"

  //  console.log(numbers)
   // return numbers;


});


router.post('/select_cat_lang', upload.any('image'), function(req, res, next){

    var id = req.body.product_cat_id;

    query_product.getSelectCatLang(id,req.body).then(select => {
    res.send({status: true, text: 'country found', data_country: select})
  });

});


router.post('/list_cat_lang', upload.any('image'), function(req, res, next){

    var product_cat_id  = req.body.product_cat_id;  // console.log(product_cat_id)

    query_product.getCatLang(product_cat_id).then(cat => {


        if(cat == ''){

            res.send({status: false, text: 'cattegory list not found'})

         }else{

              res.send({status: true, text: 'cattegory list found', cat_data: cat})

      }

   
  });

});


router.post('/product_unit', upload.any('image'), function(req, res, next){

    query_product.getProductUnit().then(product => {
    res.send({status: true, text: 'unit found', data_data: product})
  });

});



router.post('/detail_product_category', upload.any('image'), function(req, res, next){

    var product_cat_id = req.body.product_cat_id;

    query_product.detail_product_category(product_cat_id).then(product => {

        if(product == ''){

                res.send({status: false, text: 'detail category not found'})

         }else{

                res.send({status: true, text: 'detail category found', data_cat: product})

      }


 
  
  });

});



router.post('/update_product_category',upload_cat.any('cat_file'), function(req,res) {      //OK

  //res.json("jhagsdhjasaj");

    var cat_id = req.body.cat_id;
    var cat_name = req.body.cat_name;
    var cat_sort_desc = req.body.cat_sort_desc;
    var cat_desc = req.body.cat_desc;
    var cat_status = req.body.cat_id;

    var image = req.files;


    if(image == ''){

                 query_product.update_product_category_no_image(cat_id,cat_name,cat_sort_desc, cat_desc,cat_status).then(product_category => {
              
                if(product_category){

                   res.send({status:true, text:"update cetegory success"})
                  
                  }else{   

                   res.send({status:false, text:"update category failed" })
                  
                  }
         
        });

    }else{

         var cat_file = image[0].filename; 

           query_product.update_product_category(cat_id,cat_name,cat_file,cat_sort_desc, cat_desc,cat_status).then(product_category => {
                if(product_category){

                   res.send({status:true, text:"update cetegory success"})
                  
                  }else{   

                   res.send({status:false, text:"update category failed" })
                  
                  }
         
        });

    }

});


router.post('/select_product_cat_lang', upload.any('image'), function(req, res, next){   



    var product_cat_id = req.body.product_cat_id;  
  //  var section_id     = req.body.section_id;   
    let country_id     = []
    let lang           = []

     query_product.select_cat_lang(product_cat_id).then(select_lang => {  
        select_lang.map((x,i)=>{
          country_id.push(x.country_id)
        })

        query_product.country(country_id).then(response=>{
          response.map((y,z)=>{
            lang.push({value : y.country_id, label :y.country_name})
          })
          res.send({status:true,text:"language found", data: lang })
        })


    });



   /* var product_cat_id = req.body.product_cat_id;

    query_product.select_product_cat_lang(product_cat_id).then(product => {

        if(product == ''){

                res.send({status: false, text: 'product language not found'})

         }else{

                res.send({status: true, text: 'product language found', data_cat: product})

      }


 
  
  });
*/
});

router.post('/create_table', upload.any(), function(req,res){

  //res.json("hell")
 query_product.create_table().then(product => {

        if(product == ''){

                res.send({status: false, text: 'detail category not found'})

         }else{

                res.send({status: true, text: 'detail category found', data_cat: product})

      }

    })

});

//select_product_cat_lang
//add_product_cat_lang
/*  cat_language: INT, 
       cat_name: "STRING", 
       cat_desc: "TEXT"



        product_cat_id
        product_cat_name
        product_cat_shortdesc
        product_cat_desc
        country_id


*/
router.post('/add_product_cat_lang', upload.any('image'), function(req, res, next){

        var product_cat_id  = req.body.product_cat_id;
        var product_cat_name = req.body.product_cat_name;
        var product_cat_shortdesc = req.body.product_cat_shortdesc;
        var product_cat_desc = req.body.product_cat_desc;
        var country_id = req.body.country_id;

    query_product.add_product_cat_lang(product_cat_id, product_cat_name, product_cat_shortdesc,product_cat_desc, country_id).then(product => {

        if(product == ''){

                res.send({status: false, text: 'category language add failed'})

         }else{

                res.send({status: true, text: 'category language add success'})

      }

  });

});
//update_product_cat_lang
router.post('/update_product_cat_lang', upload.any('image'), function(req, res, next){

    var product_cat_lang_id   = req.body.product_cat_lang_id;
    var product_cat_name      = req.body.product_cat_name;
    var product_cat_shortdesc = req.body.product_cat_shortdesc;
    var product_cat_desc      = req.body.product_cat_desc;

    query_product.update_product_cat_lang(product_cat_lang_id,product_cat_name,product_cat_shortdesc,product_cat_desc).then(product => {

        if(product == ''){

                res.send({status: false, text: 'detail category not found'})

         }else{

                res.send({status: true, text: 'detail category found', data_cat: product})

      }


 
  
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




router.post('/search_umkm',  upload.any(), function(req, res, next){   //OKE

   var umkm_name = req.body.umkm_name;  console.log(umkm_name)

   query_product.search_umkm(umkm_name).then(merchant => {

      res.json(merchant);

  });

});


router.post('/parent_category',  upload.any(), function(req, res, next){   //OKE

   query_product.parent_category().then(product_category => {

          res.send({status : true, text : "parent category found", data_cat : product_category})

  });

});

router.post('/child_category',  upload.any(), function(req, res, next){   //OKE

  var product_cat_parent = req.body.product_cat_parent;

   query_product.child_category(product_cat_parent).then(child_category => {

          res.send({status : true, text : "parent category found", data_cat : child_category})

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
