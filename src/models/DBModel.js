 import connection from '../knexfile.js';
import camelize from 'camelize';
import snakeize from 'snakeize';


class DBModel{
  constructor(table) {
    this.connection = connection;
    this.db = connection(table);
    // this.db = diskDb.connect('src/db', [this.filename]);
  }

  async getAll() {  
   const data = await this.db.select('*');
   return camelize(data);
  }

  async getById(id) {
    const [data] = await this.db.select('*').where( 'id', id);
   return data ? camelize(data) : null;

  }
  async findByParams(params) {
    const  [data] = await this.db.select('*').where(snakeize(params));
   return data ? camelize(data) : null;

  }
  async save(data) {
    const result = await this.db.insert(snakeize(data)).returning('*');

    return camelize(data);  
  }

  async updateById(id, data) {
    const result= await this.db.update(snakeize( data)).where({id}).returning('*');

    return camelize(result);
  }

  async removeById(id) {
    const result = await this.connection.delete().where({ id });
    return camelize(result);
  }

  async removeByParams(params){
    const result = await this.connection(this.table).delete().where(snakeize(params));
    return camelize(result);
  }

  async query(sql, params) {
    const result = await this.connection.raw(sql, params);

    return camelize(result.rows);
  }
}

export default DBModel;