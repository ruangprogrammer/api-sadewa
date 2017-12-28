const knex = require('../knex'); // the connection!
const config = require('../../config');

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
                                product_cat_name: row.product_cat_name,
                                product_cat_image: row.product_cat_image,
                                product_cat_parent: row.product_cat_parent,
                                product_cat_level: row.product_cat_level,
                                children : prod.data };
                       });
                       });

    
  },



  addCategoryProduct(product_cat_parent,
                       product_cat_level,
                       product_cat_image,
                       product_cat_desc,
                       product_cat_status,
                       product_cat_name){  

            return knex('_product_category').insert({
                              product_cat_parent: product_cat_parent,
                              product_cat_level: product_cat_level,
                              product_cat_image: product_cat_image,
                              product_cat_status: product_cat_status,
                              product_cat_name: product_cat_name
                            })
                  .then(function(product_cat_id){
            return knex('_product_category_lang').insert({
                              product_cat_name:product_cat_name,
                              product_cat_desc:product_cat_desc,
                              product_cat_id:product_cat_id
                            })

                  })
  

  },



  getListProduct(){

    return knex.select('*').
             from('_product')
              .innerJoin('_product_lang','_product_lang.product_id','_product.product_id')
              .innerJoin('_merchant','_merchant.merchant_id','_product.product_id')
              .innerJoin('_product_category_lang','_product_category_lang.product_cat_id',  '_product.product_cat_id')
              .groupBy('product_name')
              .orderBy('_product.product_id', 'desc')
              .map(function(row){


                        return knex('_media').where('data_id', row.product_id).andWhere('media_primary','1').reduce(function(product, rows){
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

  getDetailEdit(id){

    return knex('_product')
            .where('product_id',id).map(function(product_id){

                  return knex('_merchant')              

            })

    //sub
    //merchant_name
    //product_cat
    //product_unit
    //product_unit_prymari
    //product_tags
    //product_images


/*
      let a = []
          return knex('_user_level_authority').select('module_id').where('user_level_id',id).then((rows)=>{
              rows.map(function (element) {
                  a.push(element.module_id)
              })
          }).then(()=>{*/
             /* return knex.select('*').from('_product').then((rows)=>{

                      let data = rows.map((element)=>{
                         // element['merchant'] = false;
                          return knex.select('*').from('_product_lang').where('product_id',element.product_id)
                              .then((docs)=>{
                                  element['product_lang'] = docs
                                  return element
                              })

                      })

                      return Promise.all(data)
                  })*/
       //   })


          ////PRODUCT DETAIl START

          //return knex('_product').limit(2);

          ////PRODUCT DETAIL END 
          

  },


  getSelectCatLang(id){

    return knex.select('country_id as value','country_name as label').from('_country').where('country_id',id);

  },



  getCatLang(product_cat_id){ console.log(product_cat_id)

    return knex.select('product_cat_desc',//'CONCAT(http://sadewa/, merchant_logo) as merchant_logo', CONCAT("http://sadewa.cyberumkm.com/uploads/images/user/",merchant_logo) as merchant_logo
                  'product_cat_shortdesc',
                  'product_cat_lang_id',
                  'product_cat_name',
                  'country_name',
                  'country_iso_code_2')
            .from('_country').innerJoin('_product_category_lang', '_country.country_id', '_product_category_lang.country_id')
            .where('_product_category_lang.product_cat_id',product_cat_id );

  },


  getProductUnit(){

    return knex.select('unit_id as value','unit_text as label')
              .from('_unit_lang');

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
  
  },

  search_umkm(umkm_name){

    return knex('_merchant').where('merchant_name', 'like', '%'+umkm_name+'%')
              .map(function(data_merchant){
                return {
                    value: data_merchant.merchant_id,
                    label: data_merchant.merchant_name
                }
              })

  },

  parent_category(){

    return knex('_product_category')
            .map(function(category){

                return {
                  value: category.product_cat_id,
                  label: category.product_cat_name
                }

            })


  },

  child_category(product_cat_parent ){

     return knex('_product_category')
            .where('product_cat_parent',product_cat_parent)
            .map(function(category){
                return {
                  value: category.product_cat_id,
                  label: category.product_cat_name
                }
            })

  },

  detail_product_category(product_cat_id){

     return knex('_product_category')
            .innerJoin('_product_category_lang','_product_category.product_cat_id','_product_category_lang.product_cat_id')
            .where('_product_category_lang.country_id','=','1')
            .where('_product_category.product_cat_id',product_cat_id)
            .map(function(category){
                return {
                  product_cat_level : category.product_cat_level,
                  product_cat_status : category.product_cat_status,
                  product_cat_name : category.product_cat_name,
                  product_cat_id : category.product_cat_id,
                  product_cat_image :  config.MEDIA_HOST + "/" + category.product_cat_image,
                  product_cat_shortdesc: category.product_cat_shortdesc,
                  product_cat_desc : category.product_cat_desc
               
                }
            })

  },

  update_product_category_no_image(cat_id,cat_name,cat_sort_desc, cat_desc,cat_status){

             return knex('_product_category')
                  .where('product_cat_id',cat_id)
                  .update({product_cat_name: cat_name,
                           product_cat_status: cat_status
                         }).then(function(product_lang){

                          return knex('_product_category_lang')
                                  .where('product_cat_id',cat_id)
                                  .update({
                                    product_cat_name: cat_name,
                                    product_cat_shortdesc : cat_sort_desc,
                                    product_cat_desc:cat_desc
                                  })

                         })

  },

  update_product_category(cat_id,cat_name,cat_file,cat_sort_desc, cat_desc,cat_status){

      return knex('_product_category')
                  .where('product_cat_id',cat_id)
                  .update({product_cat_name: cat_name,
                           product_cat_image: cat_file,
                           product_cat_status: cat_status
                         }).then(function(product_lang){

                          return knex('_product_category_lang')
                                  .where('product_cat_id',cat_id)
                                  .update({
                                    product_cat_name: cat_name,
                                    product_cat_shortdesc : cat_sort_desc,
                                    product_cat_desc:cat_desc
                                  })

                         })


  },


 
  select_cat_lang(product_cat_id){
  return knex('_product_category_lang')
              .select('country_id')
              .where('product_cat_id',product_cat_id)
  },

  country(country_id){
  return knex('_country')
              .whereNotIn('country_id',country_id)


  },


  add_product_cat_lang(product_cat_id, product_cat_name, product_cat_shortdesc,product_cat_desc, country_id){

    return knex('_product_category_lang')
              .insert({
                  product_cat_id: product_cat_id,
                  product_cat_name: product_cat_name,
                  product_cat_shortdesc: product_cat_shortdesc,
                  product_cat_desc: product_cat_desc,
                  country_id: country_id
              })


  },

  update_product_cat_lang(product_cat_lang_id,product_cat_name,product_cat_shortdesc,product_cat_desc){
    return knex('_product_category_lang')
              .where('product_cat_lang_id',product_cat_lang_id)
              .update({
                product_cat_name: product_cat_name,
                product_cat_shortdesc: product_cat_shortdesc,
                product_cat_desc: product_cat_desc,
              })
  },


  create_table(){

//  return  knex('_product_category_lang').limit(1)
         return   knex.schema.createTable('ruangcoder', function(table) {
            table.increments();
            table.string('name');
  /*          table.string('email', 128);
            table.string('role').defaultTo('admin');
            table.string('password');
            table.timestamps();*/
            }).toString()
  }




}
