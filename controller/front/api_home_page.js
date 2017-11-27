const express = require('express');
const router = express.Router();
const queries = require('../../model/front/db_home_page');
const multer  = require('multer');
const upload = multer();


router.post('/HomeData',(req,res,next)=>{

  req.checkBody("country_id").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.json({status: false, massage : ['ID Kosong'], dataSelectedCatagory:[],dataFeaturedProduct:[]});
    return;
  } else {

    var country_id = req.body.country_id;
    queries.getShow(country_id).then(index=>{
      queries.getShoww(country_id).then(show=>{

       if (index == '' && show == '') {
        res.json({status: false, massage : ['Gagal'], dataSelectedCatagory:[],dataFeaturedProduct:[]})
      }else{
       res.json({status: true, massage : ['Berhasil'], dataSelectedCatagory:index, dataFeaturedProduct:show})
     }
   });
    });
  }
});

router.post('/AppData',(req,res,next)=>{

  req.checkBody("country_id").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.json({status: false, massage : ['Data Belum dimasukan'], dataSelectedCatagory:[],dataFeaturedProduct:[],data_lang:{}});
    return;
  } else {

    var country_id = req.body.country_id;
    queries.HomeApp(country_id).then(App=>{
      queries.HomeAppp(country_id).then(Appp=>{
        queries.Cek(country_id).then(Bahasa=>{

         if (App == '') {
          res.json({status: false, massage : ['Data Kosong'], dataCategoryProduct:[],dataCurrency:[],data_lang:{}})
        }else{
         res.json({status: true, massage : ['Berhasil Mengambil data'], dataCategoryProduct:App, dataCurrency:Appp,data_lang:Bahasa})
       }
     });
      });
    });
  }
});

router.post('/cek',(req,res,next)=>{
  var country_id = req.body.country_id;
  queries.Cek(country_id).then(cek=>{
    res.json(cek)
  })
})


module.exports = router;
