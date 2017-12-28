const knex = require('../knex'); // the connection!
const config = require('../../config');
module.exports = {

  login(email,password,user) {
    return knex('_user').where({user_email:email,user_password:password}).map(function(data_user){

          return {

              user_id: data_user.user_id,
              user_level_id: data_user.user_level_id,
              user_name: data_user.user_name,
              user_email: data_user.user_email,
              user_username: data_user.user_username,
              user_is_login: data_user.user_is_login,
              user_status: data_user.user_status,
              user_photo: config.MEDIA_HOST + "/" + data_user.user_photo,

          }

    })



  },

  create(user_level_id,user_name,user_email,user_username,user_password,user_status,user_photo,user_token,user) {
    return knex('_user').
              insert({user_level_id : user_level_id,
                      user_name : user_name, 
                      user_email : user_email,
                      user_username : user_username, 
                      user_password : user_password, 
                      user_status : user_status, 
                      user_create_date : knex.fn.now(),
                      user_photo : user_photo,
                      user_token:user_token}).then(user_id => {
                            return knex.select('*').from('_user').where('user_id',user_id);
                      });
  }, 
  
  update(id, token, token_expired) {
   return knex('_user').
              where('user_id', id).
                update({user_token:token,
                        user_token_expired:token_expired});
  },


  check_token(token){

    return knex('_user').where({user_token: token});

  }

}
