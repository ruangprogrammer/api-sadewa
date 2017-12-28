const knex = require('../knex'); // the connection!

module.exports = {

  getUserLevel(){
    return knex.select('*').from('_user_level');
  },


  create(user_name, user_level, module_id) {  //console.log(user_name)
    return knex('_user_level').
              insert({user_level_name : user_name, 
              		  user_level_status : user_level}).then(user_id=>{	   
																			
              		  return knex('_user_level_authority').
              		  			insert({module_id:module_id,user_level_id:user_id})
              		  });
  },

  getUserAll(){

    return knex.select('*').from('_modules')
             .where('module_level',2)
             .orderBy('module_order','ASC')
            .map(function(users){

          return {

                module_id: users.module_id,
                name: users.module_name,
                icon: users.module_icon,
                url: users.module_link,
                checked: false

          }

    })

  },

  getUseEditLevel(user_level_id){

    return knex.select('*').from('_user_level_authority')
                .where('user_level_id',user_level_id)
                .map(function(user){
              return {
                    module_id: user.module_id
              }
    })


  },


user_save(user_level_id, module_id){

//    var oke ="sjdhksdsd";
   // console.log("Ksjdhkjsdhksd"+module_id)
    var str = "34,5,7,999";
   // console.log(str)
  // var str = module_id; // console.log(str)
   var arr = str.split(",");

   console.log(arr)

},


  user_saveq(user_level_id, module_id){


   // let module_id = module_id;
   var str = [234,5,7,999];
  // var str = module_id; // console.log(str)
   var arr = str.split(",");

   console.log(arr)



   //var data_auth = [];

    arr.forEach(data=>{
      data_auth.push({ module_id: data })
     })
//console.log(data_auth)

/*
      module_id.map((x)=>{
  
        })

    return knex('_user_level_authority')
            .insert(data_auth)*/



    return knex('_user_level_authority')
            .where('user_level_id',user_level_id)
            .del()
            .then(function(user){
  //console.log(module_id)
/*   var str = module_id;
   var arr = str.split(",");

   console.log(arr)*/

/*
   var data_auth = [];

    arr.forEach(data=>{
      data_auth.push({ module_id: data, user_level_id:user_level_id })
     })

   return knex('_user_level_authority')
            .insert(data_auth)*/

             // console.log("ksjdhksd",user)
              //  return user;
            //  console.log("ajhgsjas",module_id)

         //     console.log(module_id)

         /*   module_id.map((x)=>{
            //  console.log('----->',x)
            return knex('_user_level_authority')
                   .insert({module_id:x, user_level_id:user_level_id})
       
            });*/

/*
                return knex('_user_level_authority')
                             .insert({module_id:x, user_level_id:user_level_id})*/
        
               // })

               // return 
//
           })
 

  }
  

}
