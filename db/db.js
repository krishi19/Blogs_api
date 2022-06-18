import knex from 'knex';

import kf from './knexfile.js';


const env = process.env.NODE_ENV || 'development';
const configOptions = kf[env];

export default knex(configOptions);