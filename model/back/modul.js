const knex = require('../knex'); // the connection!

const Promise = require('bluebird');

module.exports = {


      user_modul(par){
          let a = []
          return knex('_user_level_authority').select('module_id').where('user_level_id',par).then((rows)=>{

          //  console.log(rows);

              rows.map(function (element) {
                  a.push(element.module_id)
              })
          }).then(()=>{
              return knex.select('module_id','module_name AS name','module_icon AS icon','module_link AS url').from('_modules')
                  .whereIn('module_id', a).orderBy('module_order', 'asc').then((rows)=>{

                      let data = rows.map((element)=>{
                          //element['title'] = false;
                          return knex('_modules').select('module_id',
                                                         'module_name AS name',
                                                         'module_icon AS icon',
                                                         'module_link AS url').where('module_parent_id',element.module_id)
                              .then((docs)=>{

                                  if(docs == ''){

                                  }else{

                                  element['children'] = docs
                                  
                                  }

                                  return element
                              })
                      })


                      return Promise.all(data)
                  })
          })
      },


      getList(id){

       return knex.select('module_id').from('_user_level_authority').where('user_level_id',id)
       .orderBy('auth_id','ASC')
       .map(function(row) {
                return knex('_modules').where('module_id',row.module_id).orderBy('module_order','ASC').first().then(function(ssss){

                    var module_desc = row.module_desc;

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



      },

    getAll(){

      return knex.select('*').from('_modules').map(function(data){
          return {

                module_id: data.module_id,
                name: data.module_name,
                icon: data.module_icon,
                title: (data.module_desc=='title') ? true : false,
                url:data.module_link,
                checked: false
          }
      });

    }
}