const knex = require('../knex'); // the connection!

module.exports = {

  getAll() {
    //return knex('_customer');
    return knex.select('product_id','product_name','product_price_min_range','product_price_max_range','product_create_date').from('_product');
  },

  getShow(){
    

     return knex('product').orderBy('product.product_id','asc').map(function(row) {
      
        return knex("images").where('product_id', row.product_id).reduce(function(images, rows) {
          images.data.push({img_name:rows.images_name});
          images.n++;

          return images;
        }, {n:0, data:[]})
        .then(function(img) {
          return {
            product_id:row.product_id,
            product_name:row.product_name,
            images:img.data
          };
        });
      })
      .then(function(obj) { return obj })
      .catch(function(e) { console.error(e); });

/*    return knex.select(knex
      .raw('*,CONCAT("http://sadewa.cyberumkm.com/uploads/images/user/",user_photo) as user_photo'))
      .from('_user').where('user_id', id)
      .first();*/
  //  var mightBeAnArray = [1,2,3,4,5,];
    //var c = {json_data: JSON.stringify(mightBeAnArray)};//'aku,kamu';//['first_name': 'Bob', last_name: "Heinzeberg"];//knex.select('*').fro;

    /*var query = knex.select('*').from('product').reduce(function(product,row){
    //  var alamat = "test oke";
      product.names.push(row.product_name);
      product.b.push(row.product_id);
      product.count++;
      //product.alamat.row[0];
      return product;
    },{count:0,names:[],b:[]});

    return query;*/


   /* okeeee  var query = knex.select(knex.raw('*,"'+c+'" AS children'))
    .from('product');
    return query;*/
    /*knex("product").select().then(function(ret){
      product=ret
      return knex("images").select()
    }).then(function(images){
      return images;
    });*/
   /* return knex.select('*')
    .from('product')
    .then(function(name){

       knex.select('*').from('images');
    });*/
  }
  //,
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
