        const express = require('express');

       //   const path = require('http');
        const edi = "DEVELOPER CODE INTERNASIONAL";
        const path = require('path');
        const favicon = require('serve-favicon');
        const logger = require('morgan');
        const cookieParser = require('cookie-parser');
        const bodyParser = require('body-parser');
        const crypto = require('crypto');
        const validator = require('express-validator');
        const moment = require('moment');
        const app = express();

        /////////////////https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
       // app.use('/media', express.static(__dirname + '/public/images'q));
       // app.use(express.static(path.join(__dirname, 'public')));
        //app.use('/',express.static(path.join(__dirname, 'public/media')));
       // app.use(express.static(__dirname + '/'));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname)));
        app.use(cookieParser());
        app.use(validator());
      //  app.use(express.static(__dirname + '/media'));
        app.use(function(req, res, next) {
          res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
          res.header('Access-Control-Allow-Credentials', 'true');
          res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
          res.header('Access-Control-Expose-Headers', 'Content-Length');
          res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
          next();
        });

        //*********************************************FRONT START *************************************************//
        app.use('/front/home', require('./controller/front/api_home_page'));
        app.use('/front/content', require('./controller/front/api_content'));
        app.use('/front/user', require('./controller/front/api_user'));
        //*********************************************FRONT END  *************************************************//

        //*********************************************BACK END START***************************************************//
        app.use('/back/auth', require('./controller/back/auth'));
        app.use('/back/customer', require('./controller/back/customer'));
        app.use('/back/modul', require('./controller/back/modul'));
        app.use('/back/content', require('./controller/back/content'));
        app.use('/back/product', require('./controller/back/product'));
        app.use('/back/user', require('./controller/back/user'));
        app.use('/back/admin', require('./controller/back/admin'));
        app.use('/back/umkm', require('./controller/back/umkm'));
        app.use('/back/rfi', require('./controller/back/rfi'));
        //*********************************************BACK END START **************************************************//

      app.get('/', (req, res) => {
         res.json(['WELCOME API SADEWA INTERNASIONAL']);
       });

        app.use(function(req, res, next) {
         res.json({message:'API SADEWA INTERNASIONAL GAGAL DI AKSES' , status: 404});
       });
        
        app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.json({
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {}
          });
        });

        module.exports = app;
