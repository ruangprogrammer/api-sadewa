const knex = require('../knex'); // the connection!

module.exports = {

  getListCategory() {
    return knex('_product_category').map(function(row){
                        return knex('_product_category').where('product_cat_parent', row.product_cat_id).reduce(function(product, rows){
                        product.data.push({product_cat_id:row.product_cat_id,
                                           product_cat_name: rows.product_cat_name,
                                           product_cat_image: rows.product_cat_image,
                                           product_cat_parent: rows.product_cat_parent,
                                           product_cat_level: rows.product_cat_level});
                        product.n++;
                        return product;
                       }, {n:0, data:[]}).then(function(prod){
                        return {product_cat_id: row.product_cat_id,
                                product_cat_namse: row.product_cat_name,
                                product_cat_image: row.product_cat_image,
                                product_cat_parent: row.product_cat_parent,
                                product_cat_level: row.product_cat_level,
                                child : prod.data };
                       });
                       });
  },

  getProductID(id){

    return knex.select('*').
             from('_product')
              .innerJoin('_product_lang','_product_lang.product_id','_product.product_id')
              .innerJoin('_merchant','_merchant.merchant_id','_product.product_id')
              .innerJoin('_product_category_lang','_product_category_lang.product_cat_id',  '_product.product_cat_id')
            .where('_product.product_id', id).limit(1).map(function(row){
                        return knex('_media').where('data_id', row.product_id).reduce(function(product, rows){
                        product.data.push({media_primary: rows.media_primary,
                                           media_value: 'http://sadewa.com/product/'+rows.media_value
                       });
                        product.n++;
                        return product;
                       }, {n:0, data:[]}).then(function(prod){
                        return {product_id: row.product_id,
                                product_name: row.product_name,
                                merchant_name: row.merchant_name,
                                product_price_min_range: row.product_price_min_range,
                                product_status: row.product_status,
                                product_cat_name: row.product_cat_name,
                                data_image: prod.data };

                       });

                       });
  },


  getSelectCatLang(id){

    return knex.select('country_id as value','country_name as label').from('_country').where('country_id',id);

  },



  getCatLang(){

    return knex.select('product_cat_desc',//'CONCAT(http://sadewa/, merchant_logo) as merchant_logo', CONCAT("http://sadewa.cyberumkm.com/uploads/images/user/",merchant_logo) as merchant_logo
                  'product_cat_shortdesc',
                  'product_cat_lang_id',
                  'product_cat_name',
                  'country_name',
                  'country_iso_code_2').
            from('_country').innerJoin('_product_category_lang', '_country.country_id', '_product_category_lang.country_id');

  },


  getProductUnit(){

    return knex.select('unit_id as value','unit_text as label').from('_unit_lang');

  },

  getShow(){
  
     return knex('product').orderBy('product.product_id','asc').map(function(row) {
      
        return knex("images").where('product_id', row.product_id).reduce(function(images, rows) {
          images.data.push({img_name:rows.images_name});
          images.n++;

          return images;
        }, {n:0, data:[]}).then(function(img) {
          return {
            product_id:row.product_id,
            product_name:row.product_name,
            images:img.data
          };
        });
      })
      .then(function(obj) { return obj })
      .catch(function(e) { console.error(e); });

  },
  getOne(id) {
    return knex('_product').where('id', id).first();
  },

  create(merchant_id,
         product_name,
         product_shortdesc,
         product_desc,
         product_cat_id,
         product_price_min_range,
         product_is_insurance,
         product_status,
         product_tags,
         media_name,
         media_value
         ) {
   return knex('_product').insert({merchant_id: merchant_id,
                                   product_cat_id:  product_cat_id,
                                   product_price_min_range : product_price_min_range,
                                   product_is_insurance: product_is_insurance,
                                   product_status: product_status,
                                   product_tags: product_tags,
                                   product_name: product_name
                                   }).then(function(product_id){
                             
      return knex('_product_lang').insert({product_id:product_id,
                                           product_shortdesc:product_shortdesc,
                                           product_desc:product_desc}).then(function(media){
        var data_media = [];
        media_value.forEach(data=>{
        data_media.push({data_id:product_id,media_name:product_name,media_value : data.filename})
       })     
        return  knex('_media').insert(data_media);
        
       });
     

   });//.then(product);
/*
    return knex.insert({merchant_id:merchant_id,
                        product_name: product_name
                      //  product_sort_desc:product_sort_desc,
                        //product_description:product_description,
                        product_cat_id:product_cat_id,
                        product_price:product_price,
                        product_is_insurance:product_is_insurance,
                        product_status:product_status,
                      //  product_tags:product_tags
                        }).into('_product').then(function(product_id){

                         // console.log(product_id);
                          var product_images = "productimages01982012910291021_sjhsdusdhjsdsd.jpg";
                          //console.log(product_images);
                       
                          knex.insert({data_id:product_id,media_value:product_images}).into('_media');
                        });*/

  /*  var test = [{images_name:"15101234128760_d0611665-28f5-4255-abb6-5c0a6e801c5c_717_905.jpg"},
  
    var product_name = [{product_name: "product test dddddddddddddddddddddddddddddddd"}];
    var sub_images   = [{images_name: "sub_images_name87348237923 sssssssssssssssssssssssssssssssssssssss.jpg"}];

    return knex.insert({product_name:"Sempak Muslim",product_price:233333}).into('product').then(function(id){
        return knex.insert({product_name:product_id:id}).into('images');
    });*/

 
  },
  create_test(user_level_id,user_name,user_email,user_username,user_password,user_status,user_photo,user_token,user) {
    return knex('_user').
              insert({user_level_id : user_level_id,
                      user_name : user_name, 
                      user_email : user_email,
                      user_username : user_username, 
                      user_password : user_password, 
                      user_status : user_status, 
                      user_photo : user_photo,
                      user_token:user_token});
  },
  update(id, product) {
    return knex('product').where('id', id).update(product, '*');
  },
  delete(id) {
    return knex('product').where('id', id).del();
  }

}
