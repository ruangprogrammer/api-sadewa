const express = require('express');
const router = express.Router();
const queries = require('../../model/front/db_user');
const multer  = require('multer');
const TokenGenerator = require('uuid-token-generator');
const date = require('date-and-time');
const upload = multer();
const config = require('../../config');

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
        user : config.EMAIL, // Email Si Pengirim
        pass : config.PASS  // password si pengirim
      }
    });

//========================
router.post('/registrasi',(req,res,next)=>{

  req.checkBody("name").notEmpty();
  req.checkBody("email").isEmail();
  req.checkBody("password").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.json({status: false, massage:'Ada yang kosong / Bukan Email yang anda masukan '});
    return;
  } else {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    queries.EmailFerifikasi(email).then(Email=>{
      if (Email == '') {

        queries.Registrasi(name,email,password).then(Registrasi=>{
          if (Registrasi == '') {
            res.json({status: false, massage:'Registrasi Gagal',data_customer:{}})
          } else {
            queries.Tampil(Registrasi).then(Tampil=>{
              queries.LinkId(email).then(token=>{
                if (Tampil) {
              //================kirim email==================================//
                  // var mailOptions = {
                  //     from : config.EMAIL, // nama email si pengirim
                  //     to   : email,  // tujuan kirim email ke siapa ??
                  //     subject :'Sadewa API Internasional', // subject nya apa bro ??
                  //     text :'Silahkan Klik Link ini Untuk Verifikasi password '+ token +'', // Isi nya apa bro
                  //   };

                  //   transporter.sendMail(mailOptions, function(error,info) {
                  //     if (error) {
                  //   console.log(error); // aktifkan dulu keamananya di gmail
                  // } else {
                            // res.json(info);
                            // console.log('Email Sent : ' + info.response); //informasi 
              //==============================kirim email===========================//
              res.json({status: true, massage:'Registrasi Sukses',data_customer:Tampil})
            }
          })

                  // }
                  
                })
            // })
          }
        })

      } else {
        res.json({status: false, massage:'EMAIL SUDAH TERPAKAI',data_customer:{}})
      }
    })
  }
});

router.get('/:id',(req,res,next)=>{
  var id = req.params.id;
  queries.UpdateStatus(id).then(status=>{
  if (status == '') {
    res.json({status: true, massage:'Gagal update status',data_customer:{}})
  } else {
   queries.Status(id).then(sta=>{
   res.json({status: true, massage:'Sukses status active',data_customer:sta})
   })
  }
  })

})

router.post('/Login',(req,res,next)=>{

 req.checkBody("username").notEmpty();
 req.checkBody("password").notEmpty();

 var errors = req.validationErrors();
 if (errors) {
  res.json({status: false, massage:'username / password ada yang kosong'});
  return;
} else {
  var username = req.body.username;
  var password = req.body.password;

  queries.Login(username,password).then(Login=>{
    if (Login == '') {
      res.json({status: false, massage:'Gagal',data_customer:{}})
    } else {
      res.json({status: true, massage:'Sukses',data_customer:Login})
    }

  })
}
});

router.post('/ResetPassword',(req, res, next) =>{

  req.checkBody("token").notEmpty();
  req.checkBody("password").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.json({status: false, massage:'Token / password kosong'});
    return;
  } else {

    var token = req.body.token;
    var password = req.body.password;
    queries.ResetPassword(token,password).then(Reset=>{
      if (Reset == '') {
        res.json({status: false, massage:'Gagal'})
      } else {
        res.json({status: true, massage:'Sukses'})
      }
    });
  }
});

router.post('/forgetpassword',(req,res,next)=>{

  req.checkBody("email").isEmail();

  var errors = req.validationErrors();
  if (errors) {
    res.json({status: false, massage:'Yang anda masukan kosong / Bukan Email'});
    return;
  } else {
    var email = req.body.email;
    queries.ForgetPassword(email).then(Forget=>{
      // queries.LinkToken(email).then(token=>{
        if (Forget == '') {
          res.json({status:false,message:'Data Kosong'})
        } else {
//=============================Kirim EMAIL===========================//
          // var mailOptions = {
          //             from : config.EMAIL, // nama email si pengirim
          //             to   : email,  // tujuan kirim email ke siapa ??
          //             subject :'Sadewa API Internasional', // subject nya apa bro ??
          //             text :'Silahkan Klik Link ini Untuk Verifikasi password '+ token +'', // Isi nya apa bro
          //           };

    //                 transporter.sendMail(mailOptions, function(error,info) {
    //                   if (error) {
    //     console.log(error); // aktifkan dulu keamananya di gmail
    //   } else {
    //     res.json(info);
    //     // console.log('Email Sent : ' + info.response); //informasi 
    //   }
    // });
    //==============================Kirim EMAIL==================//
    res.json({status:true,message:'Sukses'})
                  }
                // })
    })
  }
});

router.post('/ValToken',(req,res,next)=>{
  req.checkBody('token').notEmpty();
  var error = req.validationErrors();
  if (error) {
   res.json({status: false, massage:'Token belum kamu masukan silahkan masukan'});
 } else {
  var token = req.body.token;
  queries.ValidasiToken(token).then(Token=>{

    if (Token == '') {
      res.json({status: false, massage:'Token Kosong'});
    } else {
      res.json({status: true, massage:'Berhasil'});
    }
  })
}
});


router.post('/login_sosmed',(req, res, next) => {

  var email = req.body.email;
  if (email == '') {
    req.checkBody("cellphone", "cellphone").isNumeric();
    req.checkBody("name", "name").notEmpty();
    req.checkBody("token", "token").notEmpty();
    req.checkBody("type", "type").notEmpty();

  } else {
    req.checkBody("email", "Email").isEmail();
                  // req.checkBody("cellphone", "cellphone").isNumeric();
                  req.checkBody("name", "name").notEmpty();
                  req.checkBody("token", "token").notEmpty();
                  req.checkBody("type", "type").notEmpty();
                }


                var cek = req.validationErrors();
                if (cek) {
                     // res.json({string: false, message: ['ADA DATA YANG BELUM KAMU MASUKAN ATAU COBA CEK KEMBALI'], data_customer: {} });
                     res.json({string: false, message: 'Data ada yang kosong / yang anda masukan bukan email', data_customer: {} })
                     return;
                   } else {

                     var tokgen = new TokenGenerator(256, TokenGenerator.BASE58);
                     var now = new Date();
                     var cellphone = req.body.cellphone;
                     var name = req.body.name;
                     var email = req.body.email;
                     var token =  req.body.token;
                     var type =  req.body.type;
                     var _token = req.body.tok = tokgen.generate();
                     var date = req.body.date = now;

                     queries.UpdateCostumer(email,cellphone,token,type).then( Emailpon =>{

                      if (Emailpon == '') {
                        queries.Costumer(cellphone, name, email, token,  type).then( data => {

                          if ( data == '' ) {
                           queries.Insert(cellphone, name, email,  token, _token, date,  type).then( ins =>{

                            if (ins == '') {
                             res.json({string: false, message: ['Gagal'], data_customer: {} })

                           } else {
                             var id = req.body.id = ins;
                             queries.All(id).then( All => {
                              res.json({string: true, message: ['Berhasil'], data_customer: All})
                            });
                           }
                         }); 

                         }else{

                          res.json({string: true, message: ['Berhasil'], data_customer: data })

                        }

                      });

                      } else{

                        if (email == '') {

                          if (cellphone) {

                            queries.Cellphone(cellphone).then(Cel=>{

                              if (Cel == '') { 

                                queries.Tlp(cellphone, name, token, _token,date,  type).then(Tlp=>{
                                  if (Tlp == '') {

                                   res.json({string: false, message: ['Gagal'], data_customer: {} })

                                 } else {
                                  var id = req.body.id = Tlp;
                                  queries.All(id).then( All => {
                                    res.json({string: true, message: ['Berhasil Ditambahkan'], data_customer: All})
                                  });
                                }
                              });

                              } else{
                                 res.json({string: true, message: ['Berhasil'], data_customer: Cel})

                              }

                            // queries.Tlp(cellphone, name, token, _token,date,  type).then(Tlp=>{
                            //     if (Tlp == '') {

                            //      res.json({string: false, message: ['Gagal'], data_customer: {} })

                            //    } else {
                            //     var id = req.body.id = Tlp;
                            //     queries.All(id).then( All => {
                            //       res.json({string: true, message: ['Berhasil All'], data_customer: All})
                            //     });
                            //   }
                            // });
                            })

                           } else {

                             // queries.Cellphone(cellphone).then(Cel=>{
                                 

                           

                            // res.json(cellphone)
                          }
                          



                        } else {

                         queries.Mail(email).then( xxx => {
                          res.json({string: true, message: ['Berhasill'], data_customer: xxx })
                        });

                       }


                                        // res.json({email:mail})

                                      }

                                    });

                   }

                 });



module.exports = router;
