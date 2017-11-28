const knex = require('../knex'); // the connection!

const Promise = require('bluebird');

module.exports = {

      getShow(id){



       return knex.select('module_id').from('_user_level_authority').where('user_level_id',id).map(function(row) {

                return knex('_modules').where('module_id',row.module_id).orderBy('module_order','ASC').first().then(function(ssss){

                    var module_desc =row.module_desc;

                    var show_title = (module_desc=='title') ? true : false;

                    return knex("_modules").where('module_parent_id', ssss.module_id).orderBy('module_order','ASC').reduce(function(parent, rows) {

                      parent.data.push({module_id:rows.module_id,
                                        name:rows.module_name,
                                        icon:rows.module_icon,
                                        url:rows.module_link,
                                        checked:false});
                      parent.n++;

                      return parent;
                    }, {n:0, data:[]})
                    .then(function(img) {
                      return { 
                        module_id:ssss.module_id,
                        name:ssss.module_name,
                        icon:ssss.module_icon,
                        title:show_title,
                        url:ssss.module_link,
                        checked:false,
                        children:img.data
                      };
                    });
               });

            }).then(function(obj) {

                return obj;
          

          });



//------------------------------------------------------------------------------   v ----------------------------------------------------------------------------------------------------------
  
     //var a =
   /*  return knex.select('module_id').from('_user_level_authority').reduce(function(memo, row) {
       
        return knex('_modules').where('module_id',row.module_id)
        .the(function(){

        })

        memo.names.push({data_oke:row.module_id});
        memo.count++;

        return memo;

          }, {count: 0, names: []})

          .then(function(obj) {

            return { module_id :obj.names, data_asu:'asasasas'};

        });*/

//------------------------------------------------------------------------------   v ----------------------------------------------------------------------------------------------------------
       //return 
     //  console.log(id);
   /*  return knex('_user_level_authority').where('user_level_id',id).reduce(function (module, row){ 
     
            return knex('_modules').where('module_id',row.module_id);

     }, {count:0, data:[]}).then(function(obj){

       });*/

//       return Promise.all(a);
      //return a;



      //return a;
     // return da.data.module_id;

     /*  return knex('_user_level_authority').where('user_level_id',id).map(function (module){

             return knex('_modules').where('module_id',module.module_id).orderBy('module_order','ASC').map(function(row){

                  var module_desc =row.module_desc;

                  var show_title = (module_desc=='title') ? true : false;

                  return knex("_modules").where('module_parent_id', row.module_id).reduce(function(parent, rows) {

                    parent.data.push({module_id:rows.module_id,
                                      name:rows.module_name,
                                      icon:rows.module_icon,
                                      url:rows.module_link,
                                      checked:false});
                    parent.n++;

                    return parent;
                  }, {n:0, data:[]})
                  .then(function(img) {
                    return { 
                      module_id:row.module_id,
                      name:row.module_name,
                      icon:row.module_icon,
                      title:show_title,
                      url:row.module_link,
                      checked:false,
                      children:img.data
                    };
                  });

                 })

            })
*/


      },

      list_module (id) {

         return knex('_user_level_authority').where('user_level_id',id).map(function (module){

                 return knex('_modules').select('module_id',
                                           'module_name AS name',
                                           'module_icon AS icon',
                                           'module_id',
                                           'module_link AS url').where('module_id',module.module_id).then(function (rows) {

                  let promises = rows.map(function (element) {
                      element['checked'] = false
                      return knex('_modules').select('module_name AS name','module_icon AS icon','module_id','module_link AS url').where('module_parent_id',element.module_id)
                          .then(function (docs) {
                              element['children'] = docs
                              return element;
                          })
                  })

                  return Promise.all(promises);//.first();


              }).then(function (elements) {
                  return  elements;
              })


         })
      
    }

}

