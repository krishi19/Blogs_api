import DBModel from './DBModel.js';

class Users extends DBModel {
  constructor(){
    super('users');
  }
}

export default Users;





// import connection from '../knexfile.js';
// import camelize from 'camelize';
// import snakeize from 'snakeize';
// import Knex from 'knex';

// class Users {
//   constructor() {
//     // this.table = 'blogs';
//     this.db = connection('users')
//     // this.db = diskDb.connect('src/db', [this.filename]);
//   }

//   async getAll() {  
//    const data = await this.db.select('*');
//    return camelize(data);
//   }

//   async getById(id) {
//     const data = await this.db.select('*').where( 'id', id);
//    return camelize(data);

//   }
//   async findByParams(params) {
//     const data = await this.db.select('*').where(snakeize(params));
//    return camelize(data);

//   }
//   async save(data) {
//     const result = await this.db.insert(snakeize(data)).returning('*');

//     return camelize(data);  }

//   async updateById(id, data) {
//     const result= await this.db.update(snakeize( data)).where({id}).returning('*');

//     return camelize(result);
//   }

//   async removeById(id) {
//     const result = await this.db.delete().where({ id });
//     return camelize(result);
//   }
// }

// export default Users;