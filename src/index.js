import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import serveFavicon from 'serve-favicon';
import cors from 'cors';

import routes from './routes.js';
import logger from './utils/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import knex from 'knex';

var connect = {
  host: 'localhost',
  port: 5432,
  user: 'postgres' ,
  password : 'postgres',
};
var knex1 = knex({ client: 'pg', connection: connect });
knex1.raw('CREATE DATABASE blogs_database3').then(function () {
  knex1.destroy();

  // connect with database selected
  connect.database = 'blogs_database3';
  knex1 = knex({client : 'pg',
  connection : connect,});

  knex1.schema
    .createTable('blogs', function (table) {
      table.increments();
      table.string('title').notNullable().unique();
      table.string('description').nullable();
      table.timestamps();
    
    })
    .createTable('blogImages', function (table) {
      table.increments();
      table.bigInteger('blogId').notNullable();
      table.string('image_url').nullable();
      table.timestamps();
    
    })
    .createTable('users', function (table) {
      table.increments();
      table.string('email').notNullable().unique();
      table.string('name').nullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps();
     
    })
    .then(function () {
      knex1.destroy();
    });
});



const server = express();

dotenv.config();

server.use(cors());
server.use(serveFavicon('./public/favicon.ico'));

// const db = diskDb.connect('./db', ['cars']);

server.use(helmet());
server.use(morgan('common'));



// server.use(morgan('dev', {stream: logStream}));
server.use(bodyParser.json());

server.use(routes);
server.use(errorHandler);


// console.log({port: process.env.PORT,
// password: process.env.PASSWORD});

// const PORT = 8000;

server.listen(process.env.PORT, () => {
  logger.info(`Listening on 127.0.0.1:${process.env.PORT}`);
});
