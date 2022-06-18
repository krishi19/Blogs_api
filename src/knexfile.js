import Knex from 'knex';

module.exports = {
   client : 'pg',
    connection : {
      host: 'localhost',
      port: 5432,
      user: 'postgres' ,
      password : 'dipak',
      database : 'blogs_db'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true
};
// const connection = Knex ({
//   client : 'pg',
//   connection : {
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres' ,
//     password : 'dipak',
//     database : 'blogs_db'
//   },
//   migrations: {
//     tableName: 'knex_migrations'
//   },
//   useNullAsDefault: true
// });

// export default connection;



// var connect = {
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres' ,
//   password : 'dipak',
// };
// var knex1 = knex({ client: 'pg', connection: connect });
// knex1.raw('CREATE DATABASE blogs_database1').then(function () {
//   knex1.destroy();

//   // connect with database selected
//   connect.database = 'blogs_database1';
//   knex1 = knex({
//     client : 'pg',
//     connection : connect,
//     pool: {
//         min: 2,
//         max: 10
//       },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   });

//   knex1.schema
//     .createTable('blogs', function (table) {
//       table.increments();
//       table.string('title').notNullable().unique();
//       table.string('description').nullable();
//       table.timestamps();
    
//     })
//     .createTable('blogImages', function (table) {
//       table.increments();
//       table.bigInteger('blogId').notNullable();
//       table.string('image_url').nullable();
//       table.timestamps();
    
//     })
//     .createTable('users', function (table) {
//       table.increments();
//       table.string('email').notNullable().unique();
//       table.string('name').nullable();
//       table.boolean('is_active').defaultTo(true);
//       table.timestamps();
     
//     })
//     .then(function () {
//       knex1.destroy();
//     });
// }).catch(e=>{
//   console.log('error on database create', e);

// });
