//  import connection from '../knexfile.js';
import database from "../../db/db.js";
import camelize from 'camelize';
import snakeize from 'snakeize';


class DBModel{
  constructor(table) {
    this.db = database(table);
    this.table = table;
  }

  async getAll() {  
   const data = await database(this.table);
   return camelize(data);
  }

  async getById(id) {
    const [data] = await database(this.table).select('*').where( 'id', id);
   return data ? camelize(data) : null;

  }
  async findByParams(params) {
    const  [data] = await database(this.table).select('*').where(snakeize(params));
   return data ? camelize(data) : null;

  }
  async save(data) {
    const result = await database(this.table).insert(snakeize(data)).returning('*');

    return camelize(data);  
  }

  async updateById(id, data) {
    const result= await database(this.table).update(snakeize( data)).where({id}).returning('*');

    return camelize(result);
  }

  async removeById(id) {
    const result = await database(this.table).delete().where({ id });
    return camelize(result);
  }

  async removeByParams(params){
    const result = await database(this.table).delete().where(snakeize(params));
    return camelize(result);
  }

  async query(sql, params){
    const result = await database.raw(sql, params);
    return result;
  }

  async queryForBlogsWithBlogImage(sql, params) {
    // const result = await this.db.schema.raw(sql, params);
    // const result = await database.raw(sql, params);
    const allBlogs = await database(this.table);
    console.log('all blogs', allBlogs);
    // const result = await database.select(database.raw(`b.id,
    // b.title, 
    // b.description, 
    // b.created_at, STRING_AGG(blogImages.image_url, ',') AS images`)).from('blogs b').leftJoin('blogImages bi',
    // 'bi.blog_id','b.id').orderBy('b.id');
    let newAllBlogs = [];
    // const isItDoneYet = new Promise((resolve, reject) => {
    //   if (done) {
    //     const workDone = 'Here is the thing I built'
    //     resolve(workDone)
    //   } else {
    //     const why = 'Still working on something else'
    //     reject(why)
    //   }
    // })
    for(let i = 0; i<allBlogs.length; i++){
      const blog = allBlogs[i];
      await database.select('blogImages.image_url').from('blogs').leftJoin(
        'blogImages',
        'blogImages.blog_id', 
        'blogs.id').where('blogImages.blog_id', blog.id)
        .then(function(blogImages) {
          console.log('blog images :', blogImages);
          // const blogWithImageMap = {...blog, images: blogImages};
          blog.images = blogImages;  
          // newAllBlogs.push(blogWithImageMap);
  
          console.log('blog s: ', blog);
          newAllBlogs.push(blog);
        });
    }
    // allBlogs.forEach(async function(blog, index) {
      
    // });
    console.log('blogs result : ', newAllBlogs);
    if(newAllBlogs.length > 0){
      return camelize(newAllBlogs);
    }
    
  }

}

export default DBModel;