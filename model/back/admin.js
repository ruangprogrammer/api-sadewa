const knex = require('../knex'); // the connection!

module.exports = {

  getAll() {
    return knex.select('user_name','user_create_date','user_status','user_level_name').from('_user').innerJoin('_user_level', '_user.user_level_id', '_user_level.user_level_id');
  },


   create(user_level_id,user_name,user_email,user_username,user_password) {
    return knex('_user').
              insert({
                      user_level_id : user_level_id,
                      user_name : user_name, 
                      user_email : user_email,
                      user_username : user_username, 
                      user_password : user_password});
  },

}
