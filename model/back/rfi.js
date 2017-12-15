const knex = require('../knex'); // the connection!

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


  }


}
