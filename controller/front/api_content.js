const express = require('express');
const router = express.Router();
const queries = require('../../model/front/db_content');
const multer  = require('multer');
const upload = multer();


router.post('/detail',(req,res,next)=>{

  req.checkBody("country_id").notEmpty();
  req.checkBody("content_id").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.json({status: false, massage:'Ada ID yang belum di isi'});
    return;
  } else {
  var country_id = req.body.country_id;
  var content_id = req.body.content_id;

  queries.ContenDetile(country_id,content_id).then(ContenDetile=>{
    queries.contentCategories(content_id).then(contentCategories=>{
      queries.relatedConten(country_id,content_id).then(relatedConten=>{

        if (ContenDetile == '' && contentCategories == '' ) {
         res.json({status: false, massage : ['Gagal'], contentDetai:[], contentCategories:[] ,relatedConten:[]})
       } else {
         res.json({status: true, massage : ['Berhasil'], contentDetail:ContenDetile, contentCategories:[contentCategories] ,relatedContent:[relatedConten]})
         
       }

     });
    });
  });
}
});



module.exports = router;
