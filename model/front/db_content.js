  const knex = require('../knex'); // the connection!
  const config = require('../../config');

  module.exports = {

   ContenDetile(country_id,content_id){

     return knex('_content_lang').join('_content','_content.content_id','=','_content_lang.content_id').
     join('_category','_category.cat_id','=','_content.cat_id').
     join('_media','_media.data_id','=','_content.content_id').
     where('country_id',country_id).
     where('_content_lang.content_id',content_id).limit(1).map(function(row) {
       return {
        content_id:row.content_id,
        content_name:row.content_name,
        content_shortdesc:row.content_shortdesc,
        content_desc:row.content_desc,
        content_alias:row.content_alias,
        imageUrl:config.MEDIA_IMAGE_HOST + "/products/" +row.media_value,
        videoUrl:config.MEDIA_VIDEO_HOST + "/products/"+ row.media_value,
        content_hits:row.content_hits,
        cat_name:row.cat_name,
        cat_alias:row.cat_alias,
        cat_id:row.cat_id,
        content_create_date:row.content_create_date,
        content_publish_date:row.content_publish_date,

      }
    })

   },
   contentCategories(content_id){

     return knex('_content').innerJoin('_category','_category.cat_id','=','_content.cat_id').
     where('content_id',content_id).map(function(row){
      return {
        cat_id:row.cat_id,
        cat_name:row.cat_name,
        cat_alias:row.cat_alias,
      }
    })
   },
   relatedConten(country_id,content_id){

     return knex('_content_lang').join('_content','_content.content_id','=','_content_lang.content_id').
     where('_content.content_id',content_id).map(function(row) {
       return {
        content_id:row.content_id,
        content_name:row.content_name,
        content_alias:row.content_alias,
        content_shortdesc:row.content_shortdesc,
        content_create_date:row.content_create_date,
        content_publish_date:row.content_publish_date,
        imageUrl:config.MEDIA_IMAGE_HOST + "/products/" +row.media_value,
      }
    })

   },

 }