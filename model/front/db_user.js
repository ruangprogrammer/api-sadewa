const knex = require('../knex'); // the connection!
const config = require('../../config');

module.exports = {

	Registrasi(name,email,password){
		return knex('_customer').
		insert({customer_name:name,customer_email:email,customer_password:password,customer_status:'block'});
	},

	Tampil(Registrasi){
		return knex('_customer').where('customer_id',Registrasi).
		select('customer_id',
			'customer_name',
			'customer_email',
			'customer_status',
			'customer_token');
	},

	EmailFerifikasi(email){
		return knex('_customer').where('customer_email',email);
	},

	Login(username,password){
		return knex('_customer').where({customer_email:username,customer_password:password}).
		select('customer_id',
			'customer_name',
			'customer_email',
			'customer_status',
			'customer_token');
	},

	ResetPassword(token,password){
		return knex('_customer').where({customer_token:token}).update({customer_password:password});
	},

	ForgetPassword(email){
		return knex('_customer').where('customer_email',email);
	},

	ValidasiToken(token){
		return knex('_customer').where('customer_token',token);
	},

	LinkToken(email){
		return knex('_customer').where('customer_email',email).map(function(row){
			return config.TOKEN + row.customer_token
		})
	},
	LinkId(email){
		return knex('_customer').where('customer_email',email).map(function(row){
			return config.TOKEN + row.customer_id
		})
	},
	UpdateStatus(id){
		return knex('_customer').where({customer_id:id}).update({customer_status:'active'});
	},
	Status(id){
		return knex('_customer').where({customer_id:id}).map(function(sts){
			return {customer_id:sts.customer_id,
					customer_name:sts.customer_name,
					customer_email:sts.customer_email,
					customer_status:sts.customer_status,
					customer_token:sts.customer_token}
		})
	},

	UpdateCostumer(email, cellphone, token, type){
		if (type == 'facebook') {
			var data = {customer_facebook_token:token}
		}else if (type == 'google') {
			var data = {customer_google_token:token}
		}else if (type == 'twitter') {
			var data = {customer_twitter_token:token}
		}

		return knex('_customer').where({customer_email:email}).orWhere({customer_cellphone:cellphone}).update(data);
	},

	Costumer(cellphone, name, email, token,  type){

		if (type == 'facebook') {

			var cos = {customer_facebook_token:token,
				customer_email:email, 
				customer_cellphone:cellphone, 
				customer_name:name}
			}
			else if (type == 'google') {

				var cos = {customer_google_token:token,
					customer_email:email, 
					customer_cellphone:cellphone, 
					customer_name:name}

				}else if (type == 'twitter') {

					var cos = {customer_twitter_token:token,
						customer_cellphone:cellphone, 
						customer_name:name, 
						customer_email:email}
					}

					return  knex('_customer').where(cos).select('customer_id',
						'customer_name',
						'customer_email',
						'customer_status',
						'customer_token');
				},
				Insert( cellphone, name, email, token, _token,date,  type) {

					if (type == 'facebook') {
						var data = {customer_facebook_token:token,
							customer_cellphone:cellphone, 
							customer_name:name, 
							customer_email:email,
							customer_token:_token,
							customer_token_expired:date}
						}
						else if (type == 'google') {
							var data = {customer_google_token:token,
								customer_cellphone:cellphone, 
								customer_name:name, 
								customer_email:email,
								customer_token:_token,
								customer_token_expired:date}
							}else if (type == 'twitter') {
								var data = {customer_twitter_token:token,
									customer_cellphone:cellphone, 
									customer_name:name, 
									customer_email:email,
									customer_token:_token,
									customer_token_expired:date}
								}

								return knex('_customer').insert(data);
								

							},

	Tlp( cellphone, name, token, _token,date,  type) {

					if (type == 'facebook') {
						var data = {customer_facebook_token:token,
							customer_cellphone:cellphone, 
							customer_name:name, 
							customer_token:_token,
							customer_token_expired:date}
						}
						else if (type == 'google') {
							var data = {customer_google_token:token,
								customer_cellphone:cellphone, 
								customer_name:name, 
								customer_token:_token,
								customer_token_expired:date}
							}else if (type == 'twitter') {
								var data = {customer_twitter_token:token,
									customer_cellphone:cellphone, 
									customer_name:name, 
									customer_token:_token,
									customer_token_expired:date}
								}

								return knex('_customer').insert(data);
								

							},

							All(id){
								return knex('_customer').where({customer_id:id}).select('customer_id',
									'customer_name',
									'customer_email',
									'customer_status',
									'customer_token').first();


    // return knex('faishal').where('id', id).first();
},
// CELL(cellphone){
// return knex('_customer').where({customer_cellphone:cellphone}).select('customer_id',
// 	'customer_name',
// 	'customer_email',
// 	'customer_status',
// 	'customer_token').first();


// },

Cellphone(cellphone){
	return knex('_customer').where('customer_cellphone',cellphone).
	select('customer_id',
		'customer_name',
		'customer_email',
		'customer_status',
		'customer_token');
},

Mail(email,cellphone){
	return knex('_customer').where({customer_email:email}).
	select('customer_id',
		'customer_name',
		'customer_email',
		'customer_status',
		'customer_token');


    // return knex('faishal').where('id', id).first();
},



}