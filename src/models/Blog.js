import DBModel from './DBModel.js';
import getAllBlogsQuery from '../db/getAllBlogs.js';
import getBlogDetailsQuery from '../db/getBlogDetail.js'


class Blog extends DBModel {
  constructor(){
    super('blogs');
  }

     getAllBlogs() {
    return  this.query(getAllBlogsQuery);
  }

  async getBlogDetails(blogId) {
    // return this.query(getBlogDetailsQuery, {blogId});
    const [details] = await this.query(getBlogDetailsQuery, {blogId});

    return details || null ;
  }
}

export default Blog;


//  
// import connection from '../knexfile.js';
// import camelize from 'camelize';
// import snakeize from 'snakeize';

// class Blog {
//   constructor() {
//     this.table = 'blogs';
//     this.db = connection('blogs')
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

// export default Blog;
