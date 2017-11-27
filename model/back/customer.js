const knex = require('../knex'); // the connection!

module.exports = {

  getAll() {
    //return knex('_customer');
    return knex.select('customer_id',
                       'customer_name',
                       'customer_email',
                       'customer_cellphone',
                       'customer_create_date',
                       'customer_status')
                .from('_customer');
  }//,
 /* getOne(id) {
    return knex('sticker').where('id', id).first();
  },
  create(sticker) {
    return knex('sticker').insert(sticker, '*');
  },
  update(id, sticker) {
    return knex('sticker').where('id', id).update(sticker, '*');
  },
  delete(id) {
    return knex('sticker').where('id', id).del();
  }*/

}
