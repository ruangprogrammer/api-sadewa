const knex = require('../knex'); // the connection!
const config = require('../../config');

module.exports = {

  getList() {

           return knex.select('*').from('_quotation')
                      .innerJoin('_customer','_customer.customer_id','_quotation.customer_id')
                      .innerJoin('_quotation_message','_quotation.quotation_id','_quotation_message.quotation_id')
                      .where('_quotation.quotation_rfi_number','!=','')
                      .groupBy('_customer.customer_id')
                      .orderBy('_quotation_message.qm_create_date','DESC')
                      .map(function(rfi){
                        return {
                                quotation_id  : rfi.quotation_id,
                             //   customer_id: rfi.customer_id,
                             //   test: rfi.qm_text,
                                number_rfi : rfi.quotation_rfi_number,
                                create_by : rfi.customer_name,
                                create_date : rfi.quotation_create_date
                        }
                      })


  },


  addRfi(quotation_id,
        qm_text,
        qm_user_id){  

        return knex('_quotation_message')
            .insert({
            quotation_id: quotation_id,
            qm_text: qm_text,
            qm_user_id: qm_user_id,
            qm_create_date:  knex.fn.now()
        })


  },

  detail(quotation_rfi_number){

        return knex('_quotation')
                    .innerJoin('_quotation_message','_quotation.quotation_id','_quotation_message.quotation_id')
                    .innerJoin('_customer','_customer.customer_id','_quotation.customer_id')
                    .where('_quotation.quotation_rfi_number',quotation_rfi_number)
                    .orderBy('_quotation_message.qm_create_date','ASC')
                    .map(function(data){
                      return {
                        quotation_id: data.quotation_id,
                        qm_text: data.qm_text,
                        qm_customer_id: data.customer_id,
                        customer_name : data.customer_name,
                        customer_image: config.MEDIA_HOST + "/" + data.customer_image,
                        qm_user_id: data.qm_user_id,
                        qm_create_date: data.qm_create_date
                      }
                    })


  }


}
