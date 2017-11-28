const knex = require('../knex'); // the connection!

const Promise = require('bluebird');

module.exports = {

      getList(id){

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
                        module_order:ssss.module_order,
                        checked:false,
                        children:img.data
                      };
                    });
               });

            }).then(function(obj) {

                return obj;
          
          });


      }

}

