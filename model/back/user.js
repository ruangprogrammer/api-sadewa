const knex = require('../knex'); // the connection!

module.exports = {

  getUserLevel(){
    return knex.select('*').from('_user_level');
  },


  create(user_name, user_level, module_id) {  //console.log(user_name)
    return knex('_user_level').
              insert({user_level_name : user_name, 
              		  user_level_status : user_level}).then(user_id=>{	   
																			
              		  return knex('_user_level_authority').
              		  			insert({module_id:module_id,user_level_id:user_id})
              		  });
  }, 
  

}
