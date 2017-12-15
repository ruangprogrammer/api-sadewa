module.exports = {
  development: {
/*  		client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_sadewaintl',
            timezone: 'UTC',
            typeCast: function (field, next) {
              if (field.type == 'DATETIME') {
                return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
              }
              return next();
            }
        }*/

    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'cyberumk_sadewa_international'
    }
  },
};


	/*	client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_sadewaintl',
            timezone: 'UTC',
            typeCast: function (field, next) {
              if (field.type == 'DATETIME') {
                return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
              }
              return next();
            }
        }*/