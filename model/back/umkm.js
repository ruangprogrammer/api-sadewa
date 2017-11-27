const knex = require('../knex'); // the connection!

module.exports = {

  getMerchant(){


   		//return knex.select(knex.raw('SELECT * FROM _merchant')).from('_merchant');

       return knex.select('merchant_id',//'CONCAT(http://sadewa/, merchant_logo) as merchant_logo', CONCAT("http://sadewa.cyberumkm.com/uploads/images/user/",merchant_logo) as merchant_logo
       					  'merchant_logo',
       					  'merchant_name',
       					  'merchant_address',
       					  'merchant_create_date',
       					  'merchant_status',
       					  'business_type_name').
       			from('_merchant').innerJoin('_business_type', '_merchant.business_type_id', '_business_type.business_type_id');
  },


  create(merchant_type,
         merchant_name,
         merchant_address,
         merchant_email,
         merchant_phone,
         merchant_desc,
         merchant_status,
         merchant_city ) {
    return knex('_merchant').
              insert({business_type_id: merchant_type,
                       merchant_name: merchant_name,
                       merchant_address: merchant_address,
                       merchant_email: merchant_email,
                       merchant_phone: merchant_phone,
                       merchant_desc: merchant_desc,
                       merchant_status: merchant_status,
                       city_id: merchant_city
                      });
  }, 
  

}
