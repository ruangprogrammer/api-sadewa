const knex = require('../knex'); // the connection!
const config = require('../../config');

//const Promise = require('bluebird');

module.exports = {


      addContent(section_id,
                 cat_id,
                 user_id,
                 content_status,
                 content_publish_date,
                 content_name,
                 content_shortdesc,
                 content_desc,
                 content_image,
                 country_id
                 ){  

        return knex('_content').insert({section_id: section_id,
                                        cat_id:  cat_id,
                                        user_id : user_id,
                                        content_status: content_status,
                                        content_publish_date: content_publish_date,
                                        content_create_date: knex.fn.now()
                                   }).then(function(content_id){
                                    return knex('_content_lang').insert({
                                           content_id:content_id,
                                           content_name:content_name,
                                           content_shortdesc:content_shortdesc,
                                           content_desc:content_desc,
                                           country_id: country_id
                                  }).then(function(media){

                                    return  knex('_media').insert({
                                            section_id:'26',
                                            data_id:content_id,
                                            media_name:content_name,
                                            media_value : content_image,
                                            media_create_date:knex.fn.now()
                                          });

                                  })  
       
                         });

      },

      listContent(id){  
          
        return knex.select('_content.content_id',
                            '_content.section_id',
                            '_content_lang.content_name as content_name',
                            '_category.cat_name',
                            '_user.user_name',
                           '_media.media_value as content_image',
                           'content_status',
                           '_content.user_id as content_user',
                           'content_create_date').from('_content')

                    .innerJoin('_user','_user.user_id','_content.user_id')
                    .innerJoin('_media',function(){
                      this.on('_media.data_id','=','_content.content_id').andOn('_media.section_id','=',parseInt(id))
                    })
                    .innerJoin('_content_lang',function(){
                      this.on('_content_lang.content_id','=','_content.content_id').andOn('_content_lang.country_id','=',1)
                    })
                    .innerJoin('_category',function(){
                      this.on('_category.cat_id','=','_content.cat_id').andOn('_category.section_id','=',parseInt(id))
                    })
                    .where('_content.section_id',id)
                    

      },


      deleteContent(id,section_id){
          return knex('_content')
              .where('content_id',id)
              .del().then(function(del){
                return knex('_content_lang')
                 .where('content_id',id)
                 .del().then(function(del_media){
                      return knex('_media')
                              .where('section_id',section_id)
                              .andWhere('data_id',id)
                              .del()
                              .then(function(success){
                                return success;
                              })
                 })
              });


      },



        listSelectCategory(id){

        return knex('_category').where('section_id',id).map(function(row){
                   return knex('_media').where('data_id', row.cat_id).limit(1).reduce(function(cat){
                        return cat;
                           }).then(function(media){
                            return {value: row.cat_id,
                                    label : row.cat_name
                                     };
                     });
                 });

        },



        addCategory(section_id,
                  category_name,
                  category_desc,
                  category_image,
                  category_status){  

                    return knex('_category')
                              .insert({section_id:section_id,
                                       cat_name:category_name,
                                       cat_desc: category_desc,
                                       cat_image: category_image,
                                       cat_status: category_status,
                                     });

      },


      listCategory(id){

            return knex('_category').where('section_id',id).map(function(sts){
                return {
                                            cat_id: sts.cat_id,
                                            section_id: sts.section_id,
                                            cat_name : sts.cat_name,
                                            cat_description: sts.cat_desc,
                                            cat_image: config.MEDIA_HOST + "/" + sts.cat_image,
                                            cat_status: sts.cat_status,
                
              }
        })

      },

      deleteCategory(category_id,section_id){

            return knex('_category')
                      .where('cat_id',category_id)
                      .andWhere('section_id',section_id)
                      .del()

      },


      cekContent(category_id){   

        return knex('_content')
                  .where('cat_id',category_id)


      },

       detail_category(category_id,section_id){   // console.log(category_id+" dan "+section_id)

        return knex.select('*').from('_category')
                    .where('cat_id',category_id)
                    .andWhere('section_id',section_id).map(function(data){
                      return {
                        category_id: data.cat_id,
                        category_name: data.cat_name,
                        category_desc: data.cat_desc,
                        category_image: config.MEDIA_HOST + "/" + data.cat_image,
                        category_status: data.cat_status
                      }
                    })


      },

      edit_category(category_id,section_id){   // console.log(category_id+" dan "+section_id)

        return knex.select('*').from('_category')
                    .where('cat_id',category_id)
                    .andWhere('section_id',section_id).map(function(data){
                      return {
                        category_id: data.cat_id,
                        category_name: data.cat_name,
                        category_desc: data.cat_desc,
                        category_image: config.MEDIA_HOST + "/" + data.cat_image,
                        category_status: data.cat_status
                      }
                    })


      },

     update_category_no_image(category_id,
                  section_id,
                  category_name,
                  category_desc,
                  category_status){  

                    return knex('_category')
                              .where('cat_id',category_id)
                              .andWhere('section_id',section_id)
                              .update({section_id:section_id,
                                       cat_name:category_name,
                                       cat_desc: category_desc,
                                       cat_status: category_status,
                                     });

      },

      update_category(category_id,
                  section_id,
                  category_name,
                  category_desc,
                  category_image,
                  category_status){  

                    return knex('_category')
                              .where('cat_id',category_id)
                              .andWhere('section_id',section_id)
                              .update({section_id:section_id,
                                       cat_name:category_name,
                                       cat_desc: category_desc,
                                       cat_image: category_image,
                                       cat_status: category_status,
                                     });

      },




      selectLang(content_id,section_id){

        return knex('_content_lang')
                    .select('country_id')
                    .where('content_id',content_id)
      },

      test(content_id){
        return knex('_country')
                    .whereNotIn('country_id',content_id)


      },

      insertContentLang(content_name,
                       content_shortdesc,
                       content_id,
                       content_desc,
                       country_id){
        return knex('_content_lang')
                  .insert({
                     content_name: content_name,
                     content_shortdesc: content_shortdesc,
                     content_id: content_id, 
                     content_desc: content_id,
                     country_id: country_id
                  })

      },

      detailContent(content_id){ 

        return knex('_content_lang')
                    .innerJoin('_country','_country.country_id','_content_lang.country_id')
                    .where('content_id',content_id).map(function(data){

                        return {
                            content_lang_id: data.content_lang_id,
                            content_name: data.content_name,
                            content_desc: data.content_desc,
                            content_language: data.country_name

                        }

                    })

      },

      detailCategory(content_id){ 

        return knex('_content_lang')
                    .where('content_id',content_id)

      },

      editContent(content_id,section_id){ 


        return knex.select('_category.cat_id as content_category',
                            '_category.cat_name as cat_name',
                          '_content_lang.content_name as content_title',
                           '_content_lang.content_shortdesc as content_shortdesc',
                           '_media.media_value as content_image',
                           '_content_lang.content_desc as content_desc',
                           '_content.content_status as content_status',
                           '_content.content_publish_date as content_publish_date'
                          ).from('_content')
                    .innerJoin('_content_lang','_content.content_id','_content_lang.content_id')
                    .innerJoin('_category','_category.cat_id','_content.cat_id')
                    .innerJoin('_media','_content.content_id','_media.data_id')
                    .where('_content.section_id',section_id)
                    .where('_content.content_id',content_id)
                    .groupBy('_content.content_id')
                    .map(function(data){
                    return{
                    content_category: {value:data.content_category, label: data.cat_name},
                    content_title: data.content_title,
                    content_sort_desc: data.content_shortdesc,
                    content_image: config.MEDIA_HOST + "/" + data.content_image,
                    content_description: data.content_desc,
                    content_status: data.content_status,
                    content_publish_date: data.content_publish_date
                    }
                    })

      },

      edit_content_by_language(content_lang_id){

          return knex('_content_lang')
                    .where('content_lang_id',content_lang_id)
                    .map(function(data){
                    return {
                      content_title:  data.content_name,
                      content_sort_desc: data.content_shortdesc,
                      content_desc: data.content_desc
                    }
                    })

      },

      upadate_content_by_content_lang(content_lang_id,content_name,content_shortdesc,content_desc){

        return knex('_content_lang')
                .where('content_lang_id',content_lang_id)
                .update({
                  content_name: content_name,
                  content_shortdesc: content_shortdesc,
                  content_desc:content_desc
                })

      },


      save_content(content_id,
                   section_id,
                   cat_id,
                   content_name,
                   content_shortdesc,
                   content_image,
                   content_desc,
                   content_status,
                   content_publish_date){   
        return knex('_content')
                .where('content_id',content_id) 
                .update({
                    cat_id: cat_id,
                    content_status: content_status,
                    content_publish_date: knex.fn.now()
                }).then(function(data){
                    return knex('_content_lang')
                      .where('content_id',content_id)  
                      .update({ 
                        content_name : content_name,
                        content_shortdesc : content_shortdesc,
                        content_desc : content_desc
  
                      })
                }).then(function(img){
                    return knex('_media')
                    .where('data_id',content_id)
                    .andWhere('section_id',section_id)
                    .update({
                        media_value: content_image
                    })
                })

      },

      save_content_no(content_id, 
                   section_id,
                   cat_id,
                   content_name,
                   content_shortdesc,
                   content_desc,
                   content_status,
                   content_publish_date){   
        return knex('_content')
                .where('content_id',content_id) 
                .update({
                    cat_id: cat_id,
                    content_status: content_status,
                    content_publish_date: knex.fn.now()
                }).then(function(data){
                    return knex('_content_lang')
                      .where('content_id',content_id)  
                      .update({  
                        content_name : content_name,
                        content_shortdesc : content_shortdesc,
                        content_desc : content_desc
  
                      })
                })

      }





}

