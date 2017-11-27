const knex = require('./knex'); // the connection!

module.exports = {

  check_token(token){
    return knex('_user').
              where('user_token',token);
  }
}