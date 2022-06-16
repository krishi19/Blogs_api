// import Knex from 'knex' ;

// import dotenv from 'dotenv';

// dotenv.config();
// const connection = Knex({
//     client: process.env.DB_CLIENT,
//   connection: {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//     }
// });
// export default connection;

import Knex from 'knex';

const connection = Knex ({
  client : 'pg',
  connection : {
    host: 'localhost',
    port: 5432,
    user: 'postgres' ,
    password : 'postgres',
    database : 'blogs_db'
  },
  migrations : {
    tableName: 'migrations',
    directory : './migrations'
  }
});

export default connection;

