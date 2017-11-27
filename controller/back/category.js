const express = require('express');
const crypto = require('crypto');
const query_user =  require('../../model/back/product');
const Auth_mdw = require('../middlewares/auth');
const router = express.Router();


/////////////
const multer  = require('multer');
const storage = multer.diskStorage({
      destination : function(req,file,cb){
        cb(null,'uploads/');
      },
      filename : function(req, file, cb){
        cb(null,Date.now() + file.originalname);
      }
});
const upload = multer({ storage:storage});

router.post('/uploads', upload.any(), function(req,res, next){
  res.send(req.files);

});



router.get('/show', function(req, res, next){

   query_user.getShow().then(product => {

      res.json(product);

  });

});


router.get('/v/id:', upload.array(), function(req, res, next) {


     // var a = req.body.my_profile_pic;
      var a = req.params.id;
      res.json(a);

      // console.log(req.headers);

});



router.post('/create', upload.array(), function (req, res, next) {
  // req.body contains the text fields
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



router.post('/auth',(req,res, next) => {

    req.checkBody("user_email", "Enter a valid email address.").isEmail();
    req.checkBody("user_password", "Password is required.").isAlpha();

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

    var email = req.body.user_email;

    var password = req.body.user_password;

    query_user.login(email,password,req.body).then(user => {

       if(user == '') {
          
            res.send({ status: false, message: 'Login Gagal',data_admin: {} })
        
        } else {

              var user_status = user[0]['user_status'];

              if(user_status === 'block'){

                  var token_expired = "2017-09-19 01-09-10";

                  var token = crypto.createHash('md5').update(token_expired).digest('hex');

                  var id = user[0]['user_id'];

                    query_user.update(id,token,token_expired, req.body).then(user => {
                     
                    });

                res.send({ status: false, message: 'Login false', data_admin: {user} })

              }else{

                    res.send({ status: true, message: 'Login Berhasil',data_admin: user })

                }
           
         }

      });

    }

});





router.post('/register',(req, res, next) => {

    req.checkBody("user_level_id", "level id is required.").notEmpty(); 
    req.checkBody("user_name", "Name is required.").notEmpty(); 
    req.checkBody("user_email", "Enter a valid email address.").notEmpty().isEmail();
    req.checkBody("user_username", "Username is required").notEmpty();
    req.checkBody("user_password", "Password is required.").notEmpty();
    req.checkBody("user_status", "Status is required.").notEmpty();
    req.checkBody("user_photo", "Photo is required.").notEmpty();
    req.checkBody("user_token", "Token is required.").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.send(errors);
      return;
    } else {

      var user_level_id = req.body.user_level_id;  
      var user_name     = req.body.user_name;
      var user_email    = req.body.user_name;
      var user_username = req.body.user_username;
      var user_password = req.body.user_password;
      var user_status   = req.body.user_status;
      var user_photo    = req.body.user_photo;
      var user_token    = req.body.user_token;

      query_user.create(user_level_id,user_name,user_email,user_username,user_password,user_status,user_photo,user_token,req.body).then(user => {
        res.json(user);
      });
    
    }

});



router.post('/check_token',Auth_mdw.check_token, function(req, res, next){

  query_user.getAll().then(user => {
    res.send({ status: true, message: 'Login Berhasil',data_admin: user })
    next();
  });
 // res.json("tasuaysasi");

});


//test midleware start 
router.get('/list', (req, res, next) => {


  res.json("test");
/*  query_user.getAll().then(user => {
    res.send({ status: true, message: 'Login Berhasil',data_admin: user })
    next();
  });*/


});


router.put('/:id', (req, res, next) => {
 // if(validSticker(req.body)) {
    query_user.update_token(req.params.id, req.body).then(user => {
      res.json(user[0]);
    });
/*  } else {
    next(new Error('Invalid sticker'));
  }*/
});


router.put('/:id', (req, res, next) => {
 // if(validSticker(req.body)) {
    query_user.update(req.params.id, req.body).then(user => {
      res.json(user[0]);
    });
/*  } else {
    next(new Error('Invalid sticker'));
  }*/
});

/*
router.put('/update/:id', (req, res, next) => {
  //if(validSticker(req.body)) {
  //res.json('hekwesd');
    query_user.update(req.params.id, req.body).then(user => {
      res.json(user[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});
*/

/*router.post('/update', (req, res, next) => {

  query_user.update_token()

});
*/

//test midleware end 
/*
router.post('/create', (req, res, next) => {
  //res.json('test');
//  if(validSticker(req.body)) {

  var nama = req.body.nama;
  var email = req.body.email;

  if (nama === "") {
    res.json({status: false, message: "Nama tidak boleh kosong"})
  }

  if (email === "") {
    res.json({status: false, message: "Nama tidak boleh kosong"})
  }

   query_user.create(nama, email).then(user => {
      res.json(user[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});
*/


router.put('/update_token/:id', (req,res, next) => {   //oke

 // res.json('test udpaet token');
  //console.log('Time: %d', Date.now());

/*   var Xmas95 = new Date('December 25, 1995 23:15:30');
   var d = Xmas95.getDate();
// var d = Date.now();
   res.json(d);
*/

  //var data = "2018-08-1e2"; 
  //var token = crypto.createHash('md5').update(data).digest('hex');
/*  var username = req.body.username;
  var password = req.body.password;*/
  var token = "lsdklskdsd";
  var token_expired = "2017-09-19 01-09-10";
   query_user.update(req.params.id,token,token_expired, req.body).then(user => {
      res.json("udpate berhasil");
    });

});


/*      var token = "lsdklskdsd";
              var token_expired = "2017-09-19 01-09-10";
               query_user.update(req.params.id,token,token_expired, req.body).then(user => {
                  res.json("udpate berhasil");
                });
*/

/*router.post('/login_check',(req, res, next) => {
  
  var username = req.body.user_email;

  var password = req.body.user_password;

   query_user.login_check(username,password,req.body).then(user => {

       if(user == '') {
           
            res.send({ status: false, message: 'Login Gagal',data_admin: {} })
        
        } else {
            
            var user_status = user[0]['user_status'];

         //  res.json({user_status});

            if(user_status === 'block'){

                var token_expired = "2017-09-19 01-09-10";

                var token = crypto.createHash('md5').update(token_expired).digest('hex');

                var id = user[0]['user_id'];

                  query_user.update(id,token,token_expired, req.body).then(user => {
                   
                  });

              res.send({ status: false, message: 'Login false', data_admin: {user} })

            }else{*/

      /*          var token_expired = "2017-09-19 01-09-10";

                var token = crypto.createHash('md5').update(token_expired).digest('hex');

                var id = user[0]['user_id'];

                 query_user.update(id,token,token_expired, req.body).then(user => {

                  });*/

             /*     res.send({ status: true, message: 'Login Berhasil',data_admin: user })

              }
         
       }

    });

});*/



/*
router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(sticker => {
    if(sticker) {
      res.json(sticker);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if(validSticker(req.body)) {
    queries.create(req.body).then(stickers => {
      res.json(stickers[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validSticker(req.body)) {
    queries.update(req.params.id, req.body).then(stickers => {
      res.json(stickers[0]);
    });
  } else {
    next(new Error('Invalid sticker'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});
*/
module.exports = router;
