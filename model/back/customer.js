const knex = require('../knex'); // the connection!
const config = require('../../config');

module.exports = {

        async getListCustomer(begin_index) {   
          let a = 0;
          //return knex.raw("SELECT COUNT('*') AS isi,customer_id,customer_name FROM _customer")
       //   return knex('_customer').count('customer_id').first().then(function(row){
          const b = await knex('_customer').count('customer_id AS count').first().then(function(v){
            a=v.count
            //console.log(v)
            //return v;
          });

/*          var per_page = +per_page || 50;
          var page = +current_page || 1;
          if ( page < 1 ) page = 1;
          var offset = (page - 1)  * per_page;*/
//console.log(begin_index)
        var ok = parseInt(begin_index); //console.log(ok)
         return knex.select('customer_id',
            'customer_name',
            'customer_email',
            'customer_cellphone',
            'customer_create_date',
            'customer_status').from('_customer').limit(50).offset(ok).then(function(row){

              //console.log("jsjsjs"+begin_index)
              return {data_count:a,data_customer:row}
          })

        },
        
        getListCustomer1(per_page, current_page) {

    //      paginate(per_page, current_page) {
              var pagination = {};
             


   /*           return Promise.all([
                  this.clone().count('* as count').first(),
                  this.offset(offset).limit(per_page)
                ]).then(function(values) {
                    var count = values[0].count;
                    var rows = values[1];
                    pagination.data = rows;
                    pagination.total = count;
                    pagination.per_page = per_page;
                    pagination.offset = offset;
                    pagination.to = offset + rows.length;
                    pagination.last_page = Math.ceil(count / per_page);
                    pagination.current_page = page;
                    pagination.from = offset;
                    return pagination;
                });
              }); */

        },






        getCustomerId(id){ //console.log(id)

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
