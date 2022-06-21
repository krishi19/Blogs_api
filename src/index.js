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
import db from "../db/db.js";
import http from 'http';

const app = express();

dotenv.config();

app.use(cors());
app.use(serveFavicon('./public/favicon.ico'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// const db = diskDb.connect('./db', ['cars']);

app.use(helmet());
app.use(morgan('common'));



// app.use(morgan('dev', {stream: logStream}));

app.use(routes);
app.use(errorHandler);


// console.log({port: process.env.PORT,
// password: process.env.PASSWORD});

// const PORT = 8000;
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  logger.info(`Listening on 127.0.0.1:${process.env.PORT}`);
});
