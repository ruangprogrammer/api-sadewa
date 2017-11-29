const knex = require('../knex'); // the connection!

module.exports = {

  getAll() {
  
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
  }
 

}
