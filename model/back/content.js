const knex = require('../knex'); // the connection!
const config = require('../../config');

const Promise = require('bluebird');

module.exports = {

      addCategory(id){


      },

      addContent(){




      },

      listContent(id){
        /*
        $opt="",$sectionId="", $catId="",$limit=""
        SELECT _content.*,_content_lang.*,_country.*
                  FROM _content 
                  LEFT JOIN _content_lang USING (content_id)
                  LEFT JOIN _country USING(country_id)
                  WHERE _content.section_id = '26' &&
                      _country.country_is_primary = '1'
                  GROUP BY _content_lang.content_id
                   ORDER BY _content.content_publish_date DESC

        */

        return knex.select('*').from('_content')
                    .leftJoin('_content_lang','_content.content_id','_content_lang.content_id')
                      .leftJoin('_user','_user.user_id','_content.content_id')
                      .groupBy('_content_lang.content_id').map(row =>{

                       return knex('_media').where('data_id', row.content_id).limit(1).reduce(function(cat){
                        return cat;
                           }).then(function(media){ 
                            return {
                                    content_id:row.content_id,
                                    content_image: config.MEDIA_IMAGE_HOST + "/content/"+media.media_value,
                                    content_name:row.content_name,
                                    content_status:row.content_status,
                                    content_user :row.user_name,
                                    content_create_date: row.content_create_date
                                     };
                     });

                      });

      },





      listCategory(id){

         return knex('_category').where('section_id',id).map(function(row){
                   return knex('_media').where('data_id', row.cat_id).limit(1).reduce(function(cat){
                        return cat;
                           }).then(function(media){ // console.log(prod)
                            return {cat_id: row.cat_id,
                                    section_id: row.section_id,
                                    cat_name : row.cat_name,
                                    cat_description: row.cat_desc,
                                    cat_status: row.cat_status,
                                    cat_image: config.MEDIA_IMAGE_HOST + "/content/"+media.media_value,
                                    cat_create_date: media.media_create_date
                                     };
                     });
                 });

            }




}

