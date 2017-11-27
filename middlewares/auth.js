//const query_user = require('../db/back/user');
const query_token = require('../model/token');

var Auth = {
    check_token: function (req, res, next)
    {

            var token = req.body.token;
           // res.json(token);
            query_token.check_token(token, req.body).then(user => {

                //res.json(user[0]);
               
                if(user[0] == null){

                  res.json("token tidak ditemukan ");

                }else{

                  next();
                  //res.json("token ditemukan");

                }

               /* if(user == ''){

                   res.json("ditemukan");

                }else{

                  res.json("tidak ditemukan");
                
                }*/

                /* var user_token = user[0]['user_token'];
                 //res.json(user[0]['user_token']);

                 if(token === user_token){
                     res.json('Token ditemukan');
                 }else{
                     res.json('Token tidak ditemukan');
                 }*/


            });


     //  var a = 8;
       //if(a === 8){
//        var username = req.params.id;//req.body.username;
       /* var nama = req.body.nama; 

        if(nama === 'jancuk'){

        res.json(nama);

        }else{

       	//res.json("middleware show update token");  
        next();
      }*/
      //}//next();
     /* else{  

      		next();
  		}*/
    }
};


module.exports = Auth;