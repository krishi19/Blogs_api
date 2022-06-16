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
