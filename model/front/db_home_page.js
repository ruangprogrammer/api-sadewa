const knex = require('../knex'); // the connection!
const config = require('../../config');

const Promise = require('bluebird');


module.exports = {


  getShow(country_id){


   return knex('_product_category_lang').
   join('_product_category','_product_category.product_cat_id','=','_product_category_lang.product_cat_id').
   where('country_id',country_id).
   where('product_cat_level', '1').map(function(row) {

    return knex("_product_category").where('product_cat_parent', row.product_cat_id).limit(2).reduce(function(parent, roxx) {
      parent.data.push({product_cat_name:roxx.product_cat_name,
        product_cat_id:roxx.product_cat_id,
        product_cat_alias:roxx.product_cat_alias,
        product_cat_image: config.MEDIA_THUMBS_HOST +"/"+ roxx.product_cat_image});
      parent.n++;
         // console.log(parent);
         return parent;
       }, {n:0, data:[]})
    .then(function(img) {
      return {
        product_cat_name:row.product_cat_name,
        product_cat_id:row.product_cat_id,
        product_cat_alias:row.product_cat_alias,
        product_cat_image:config.MEDIA_IMAGE_HOST + '/' +row.product_cat_image,
        child:img.data
      };
    });
  });
 },

 getShoww(country_id){

   return knex('_product_category_lang').
   join('_product_category','_product_category.product_cat_id','=','_product_category_lang.product_cat_id').
   where('country_id',country_id).
   where('product_cat_level', '1').
   map(function(row) {

    return knex("_product").join('_media','_media.media_id','=','_product.product_id').where('product_cat_id', row.product_cat_root).limit(10).reduce(function(parent, roxx) {
      parent.data.push({product_id:row.product_id,
        product_name:roxx.product_name,
        product_alias:roxx.product_alias,
        product_price_min_range:roxx.product_price_min_range,
        product_price_max_range:roxx.product_price_max_range,
        product_min_order_qty:roxx.product_min_order_qty,
        media_value: config.MEDIA_IMAGE_HOST + "/products/" + roxx.media_value,
        rating:0,
        unit_text:roxx.unit_text});
      parent.n++;

      return parent;
    }, {n:0, data:[]})
    .then(function(img) {
      return {
        product_cat_name:row.product_cat_name,
        product_cat_id:row.product_cat_id,
        product_cat_alias:row.product_cat_alias,
        product_cat_image:config.MEDIA_IMAGE_HOST + "/products/" +row.product_cat_image,
        product:img.data
      };
    });
  });
 },

 HomeApp(country_id){

   return knex('_product_category_lang').
   join('_product_category','_product_category.product_cat_id','=','_product_category_lang.product_cat_id').
   where('country_id',country_id).
   where('product_cat_level', '1').map(function(row) {

    return knex("_product_category").where('product_cat_parent', row.product_cat_id).reduce(function(parent, roxx) {
      parent.data.push({product_cat_name:roxx.product_cat_name,
        product_cat_id:roxx.product_cat_id,
        product_cat_alias:roxx.product_cat_alias,
        product_cat_image: config.MEDIA_THUMBS_HOST +"/media/"+ roxx.product_cat_image});
      parent.n++;
      return parent;
    }, {n:0, data:[]})
    .then(function(img) {
      return {
        product_cat_name:row.product_cat_name,
        product_cat_id:row.product_cat_id,
        product_cat_alias:row.product_cat_alias,
        product_cat_image:config.MEDIA_THUMBS_HOST +"/media/"+row.product_cat_image,
        child:img.data
      };
    });
  });
 },

 HomeAppp(country_id){
  return knex('_currency').
  where({country_id:country_id}).map(function(app){
    return {country_id:app.country_id,
      currency_nominal:app.currency_nominal,
      currency_code:app.currency_code,
      currency_name:app.currency_name}
    })
},

Bahasa(country_id){
 return knex('_lang_text').join('_lang_key','_lang_key.lang_key_id','=','_lang_text.lang_key_id').where('country_id',country_id).map(function(ro){
  return knex('_lang_group').where('lang_group_id', ro.lang_group_id ).reduce(function(cook,row) {
     cook.dat.push(row.lang_group_key)
    return cook
  },{dat:[]}).then(function(re){ 

    return {jancok:ro.lang_text,cek:re.dat}})

})
},


Cek(country_id){
 return knex('_lang_group').reduce(function(cok,group){
  return knex('_lang_key').where('lang_group_id',group.lang_group_id).map(function(key){
  return knex('_lang_text').where('lang_key_id', key.lang_key_id).where('country_id',country_id).map(function(text) {

    return {
      lang_group_key:group.lang_group_key,
      lang_key:key.lang_key,
      lang_text:text.lang_text
    }
  })
})
  })
}




//==================
}