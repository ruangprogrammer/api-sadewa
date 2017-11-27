const knex = require('../knex'); // the connection!

module.exports = {

/*  get_check() {

  }*/


  getUserLevel(){
    return knex.select('*').from('_user_level');
  },


  create(user_name, user_level) {
    return knex('_user_level').
              insert({user_level_name : user_name, user_level_id : user_level 
                      });
  }, 
  

}
