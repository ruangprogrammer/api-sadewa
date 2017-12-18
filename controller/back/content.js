const express = require('express');
//const crypto = require('crypto');
const query_content =  require('../../model/back/content');
const Auth_mdw = require('../../middlewares/auth');
const config = require('../../config');
// const moment = require('moment');
const router = express.Router();
const path = require('path');

/*const multer  = require('multer');
const storage = multer.diskStorage({
      destination : function(req,file,cb){  
        cb(null,'media/images/');
      },
      filename : function(req, file, cb){
        cb(null,'content_'+Date.now() + file.originalname);
      }
});
*/
const multer  = require('multer');

const storage_category = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'media/');
      },
      filename : function(req, file, cb){

        cb(null,'category-'+Date.now()+ path.extname(file.originalname));

      }
});

const storage_content = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'media/');
      },
      filename : function(req, file, cb){

      
        cb(null,'content-'+Date.now()+ path.extname(file.originalname));


      }
});


const storage = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'media/');
      },
      filename : function(req, file, cb,errors){

      
        cb(null,'content-'+Date.now()+ path.extname(file.originalname));

        console.log(file.mimetype)
      }
});


const upload_category = multer({ storage:storage_category});   
const upload_content = multer({ storage:storage_content});   
const upload = multer({ storage:storage});   




//router.post('/add_content', upload.single(),Auth_mdw.check_token, (req, res) => {  use tokrn
router.post('/add_content', upload_content.single('content_image'), (req, res) => {


 var section_id = req.body.content_section_id;
 var cat_id = req.body.content_category;
 var user_id = req.body.content_user_id;
 var content_status = req.body.content_status;
 var content_publish_date = req.body.content_publish_date;


 var content_name = req.body.content_title;
 var content_shortdesc = req.body.content_short_desc;
 var content_desc = req.body.content_desc;
 var country_id = 1;

 var content_image    = req.file.filename; 

    query_content.addContent(section_id,
                       cat_id,
                       user_id,
                       content_status,
                       content_publish_date,
                       content_name,
                       content_shortdesc,
                       content_desc,
                       content_image,
                       country_id
                       ).then(modul => {
    
      if(modul == ''){

          res.send({status:false,text:"add content failed" })

       }else{

          res.send({status:true,text:"add content success"})

    }

  });

});

router.post('/delete_content', upload.single(), (req,res)=>{

     var id = req.body.content_id; 
     var section_id = req.body.section_id;

     query_content.deleteContent(id,section_id).then(delete_content => {


     res.send({status:true,text:"delete content success"})

    });
   

});

router.post('/list_content',upload.single(), (req, res) => {

    req.checkBody("section_id", "section is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

     var id = req.body.section_id;   

     query_content.listContent(id).then(content => {

      cnt   = []

      content.map((x,i)=>{
        cnt.push({
          content_id:x.content_id
          ,content_name:x.content_name
          ,user_name:x.user_name
          ,section_id:x.section_id
          ,cat_name:x.cat_name
          ,content_image:config.MEDIA_HOST+"/"+x.content_image,
          content_status:x.content_status,
          content_create_date : x.content_create_date
        })
    
      })
      if(content == ''){

          res.send({status:false,text:"data content not found", data_content: [] })

       }else{

          res.send({status:true,text:"data content found",data_content:cnt})

    }

    });
   
   }

});


router.post('/add_category',upload_category.single('category_image'), function(req,res) {   

    var section_id = req.body.section_id;
    var category_name = req.body.category_name;
    var category_desc = req.body.category_desc;
    var category_image = req.file.filename; 
    var category_status = req.body.category_status;

     query_content.addCategory(section_id,
                               category_name,
                               category_desc,
                               category_image,
                               category_status).then(category => {
          if(category){

             res.send({status:true, text:"add category success"})
            
            }else{   

             res.send({status:true, text:"add category failed" })
            
            }
   
  });

});


router.post('/list_category', upload.single(), (req, res) => {  

    req.checkBody("section_id", "section is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

     var id = req.body.section_id;   

     query_content.listCategory(id).then(content => {  
    
      if(content == ''){

          res.send({status:false,text:"data content not found", data_content: [] })

       }else{

          res.send({status:true,text:"data content found",data_content:content})

    }

    });

   }

});



router.post('/delete_category', upload.single(), (req, res) => {  

     var category_id = req.body.category_id;
     var section_id = req.body.section_id;  

     query_content.cekContent(category_id).then(cek => {

      if(cek == ''){

          query_content.deleteCategory(category_id,section_id).then(content => {  

              res.send({status:true,text:"berhasil delete"})

          })
            
      }else{

        res.send({status:false,text:"gagal delete "})       

      }
    });
});




router.post('/detail_category', upload.single(), (req, res) => {  

    req.checkBody("section_id", "section is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

     var id = req.body.section_id;   

     query_content.listCategory(id).then(content => {  
    
      if(content == ''){

          res.send({status:false,text:"data content not found", data_content: [] })

       }else{

          res.send({status:true,text:"data content found",data_content:content})

    }

    });

   }

});



router.post('/select_category', upload.single(), (req, res) => {  

    req.checkBody("section_id", "section is required.").notEmpty(); 
 
    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

     var id = req.body.section_id;   

     query_content.listSelectCategory(id).then(content => {  
    
      if(content == ''){

          res.send({status:false,text:"data cat not found", data_content: [] })

       }else{

          res.send({status:true,text:"data cat found",data_content:content})

    }

    });

   }

});



router.post('/select_language', upload.single(), (req, res) => {  


    var content_id = req.body.content_id;  
    var section_id = req.body.section_id;   
    let country_id = []
    let lang      = []

     query_content.selectLang(content_id, section_id).then(select_lang => {  
        select_lang.map((x,i)=>{
          country_id.push(x.country_id)
        })

        query_content.test(country_id).then(response=>{
          response.map((y,z)=>{
            lang.push({value : y.country_id, label :y.country_name})
          })
          res.send({status:true,text:"language found", data: lang })
        })


    });



});



router.post('/add_content_language', upload.single(), (req, res) => {  

      var content_name =  req.body.content_name;
      var content_shortdesc = req.body.content_sort_desc;
      var content_id =  req.body.content_id;
      var content_desc = req.body.content_desc;       
      var country_id = req.body.country_id;

       query_content.insertContentLang(content_name,
                                       content_shortdesc,
                                       content_id,
                                       content_desc,
                                       country_id).then(select_lang => {  

                              res.send({status:true,text:"add success"})
       

      });

});


router.post('/detail_content', upload.single(), (req, res) => {  

     var content_id =  req.body.content_id;

     query_content.detailContent(content_id).then(data => {  

        res.send({status:true,text:"content found", data: data})
    

    });

});



router.post('/detail_category', upload.single(), (req, res) => {    

     var content_id =  req.body.content_id;

      query_content.detailCategory(content_id).then(data => {  

        res.send({status:true,text:"content found", data: data})
    

    });

});


router.post('/edit_content', upload.single(), (req, res) => {   

     var content_id =  req.body.content_id;
     var section_id = req.body.section_id;

     query_content.editContent(content_id,section_id).then(data => {  

        if(data == ''){

           res.send({status:false,text:"content not found", data:[]})

         }else{

              res.send({status:true,text:"content found",data:data})

        }
    

    });

});



router.post('/edit_content_by_language', upload.single(), (req, res) => {    

     var content_lang_id  =  req.body.content_lang_id ;

     query_content.edit_content_by_language(content_lang_id ).then(data => {  

          if(data == ''){

              res.send({status:false,text:"content not found", data: [] })

           }else{

              res.send({status:true,text:"content found",data:data})

        }

      })
      

});


     
router.post('/save_content_by_language', upload.single(), (req, res) => {    

     var content_lang_id  =  req.body.content_lang_id;
     var content_name =    req.body.content_title;
     var content_shortdesc = req.body.content_sort_desc;
     var content_desc = req.body.content_desc;

     query_content.upadate_content_by_content_lang(content_lang_id,
                                                content_name,
                                                content_shortdesc,
                                                content_desc ).then(data => {  


          if(data == ''){

              res.send({status:false,text:"edit content failed"})

           }else{

              res.send({status:true,text:"edit content success"})

        }
      

});

});


router.post('/save_content', upload.any("content_image"), (req, res) => { 

     var content_id = req.body.content_id;
     var section_id = req.body.content_section_id;
     var cat_id = req.body.content_category; 
     var content_name = req.body.content_title;
     var content_shortdesc = req.body.content_shortdesc;
     var image = req.files;
     
   //  console.log(content_image);
     var content_desc = req.body.content_desc;
     var content_status = req.body.content_status;
     var content_publish_date = req.body.content_publish_date;

     if(image == ''){

      query_content.save_content_no(content_id,
                                        section_id,
                                        cat_id,
                                        content_name,
                                        content_shortdesc,
                                        content_desc,
                                        content_status,
                                        content_publish_date).then(data => {  

                  if(data == ''){

                      res.send({status:false,text:"edit content failed"})

                   }else{

                      res.send({status:true,text:"edit content success"})

                }
              

        });
     // console.log("KOSONG")

     }else{

               var content_image = image[0].filename; console.log(content_image)

                query_content.save_content(content_id,
                                        section_id,
                                        cat_id,
                                        content_name,
                                        content_shortdesc,
                                        content_image,
                                        content_desc,
                                        content_status,
                                        content_publish_date).then(data => {  

                  if(data == ''){

                      res.send({status:false,text:"edit content failed"})

                   }else{

                      res.send({status:true,text:"edit content success"})

                }
              

        });
      //console.log("ISI")
     // 
     }
    
    //console.log(content_image)



     //console.log(content_image)


   

});






module.exports = router;
