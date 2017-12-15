const knex = require('../knex'); // the connection!
const config = require('../../config');

module.exports = {

  getListCustomer() {

      return knex('_customer')//.limit(2);

                .map(function(data){
                          return {
                            customer_id: data.customer_id,
                            customer_name: data.customer_name,
                            customer_email: data.customer_email,
                            customer_callhone: data.customer_cellphone,
                            customer_create_date: data.customer_create_date,
                            customer_status: data.customer_status
                          }
                })


        },

        getCustomerId(id){ console.log(id)

          return knex('_customer')
                      .where('customer_id',id)
                      .map(function(data){
                        return {
                            customer_name: data.customer_name,
                            customer_birth_date : data.customer_birth_date,
                            customer_gender : data.customer_gender,
                            customer_image:  config.MEDIA_HOST + "/" + data.customer_image,
                            customer_email : data.customer_email,
                            customer_phone: data.customer_phone,
                            customer_create_date: data.customer_create_date,
                            customer_status: data.customer_status

                        }

                      })

        }

}
