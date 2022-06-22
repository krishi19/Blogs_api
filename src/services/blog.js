import Boom from '@hapi/boom';

import Blog from '../models/Blog.js';
import logger from '../utils/logger.js';
import httpStatusdes from 'http-status-codes';
import BlogImage from '../models/BlogImage.js';

export async function getAllBlogs(query) {
  const blogFilter = query.blogId ? query.blogId.split(',').map(Number) : [];

  const titleFilter = query.titleId ? query.titleId.split(',').map(Number) : [];
  const descriptionFilter = query.descriptionId ? query.descriptionId.split(',').map((val) => +val) : [];
  const writerFilter = query.writer ? query.writer.split(',') : [];

  logger.info('Fetching a list of all blogs');

  const blogs = await new Blog().getAllBlogs();
  // const parsedBlogs = blogs.map((blog) => ({
  //   ...blog,
  //   images: blog.images ? blog.images.split(',') : [],
  // }));

  let filteredBlogs = blogs;
  console.log({ filteredBlogs, descriptionFilter, titleFilter });
  if (blogFilter.length) {
    filteredBlogs = blogs.filter((blog) => blogFilter.includes(blog.blogId));
  }

  if (titleFilter.length) {
    filteredBlogs = blogs.filter((blog) => titleFilter.includes(blog.titleId));
  }
  if (descriptionFilter.length) {
    filteredBlogs = blogs.filter((blog) => descriptionFilter.includes(blog.descriptionId));
  }
  if (writerFilter.length) {
    filteredBlogs = blogs.filter((blog) => writerFilter.includes(blog.writer));
  }
  console.log('filter blogs: ', filteredBlogs)
  if(!filteredBlogs){
    console.log('filter blogs not find');
    return {
      data: [],
      message: 'Successfully fetched all blogs.',
    };
  }
  return {
    data: filteredBlogs,
    message: 'Successfully fetched all blogs.',
  };
}

export async function getBlog(id) {
  logger.info(`Fetching blog with blogId ${id}`);

  const blog = await new Blog().getBlogDetails(id);

  // const a = null ;
  // a.b.c;

  if (!blog) {
    logger.error(`Cannot find blog with blogId ${id}`);

    throw new Boom.notFound(`Cannot find blog with blogId ${id}`);
  }

  const parsedBlog = {
    ...blog,
    images: blog.images ? blog.images.split(',') : [],
  };
  return {
    data: parsedBlog,
    message: `Details of blogId ${id}`,
  };
}

export async function addBlog(params) {
  logger.debug('Payload received', params);

  const blogTableInsertParams = {
    title:params.title,
    description: params.description,
    // writer : params.writer,
    // horserpower : params.horserpower
  };
  logger.info('Checking if similar record already exists');

  const existingData = await new Blog().findByParams(blogTableInsertParams);

  if (existingData) {
    logger.error('Data with the same payload already exists');

    throw new Boom.badRequest('Data with the same payload already exists');
  }
  logger.info('Saving the new blog data');
  const blogData = await new Blog().save(blogTableInsertParams);
  console.log('blog : ', blogData);
  const allBlogData = await new Blog().getAllBlogs();
  console.log('all blogs: ', allBlogData);
//   if (params.images.length) {
//     logger.info('Creating insert data for blog_images table');
//     const blogImagesInsertData = params.images.map((url) => ({
//       blogId: blogData.id,
//       imageUrl: url
//     }));

// logger.info(`Inserting ${blogImagesInsertData.length} records into the blog_images table`);
//     blogImagesInsertData.forEach(async (insertData) => {
//       await new BlogImage().save(insertData);
//     });
//   }
//   logger.info('Retreiving the saved blog details');
//   // const data = await new Blog().getAllBlogs();
//   const data = await new Blog().getAllBlogs(blogData.id);

  
  return {
    data : allBlogData,
    message: 'Added the record successfully',
  };
}
export async function updateBlog(id, params) {
  logger.info(`Checking the existence of blog with id ${id}`);

  const blog = await new Blog().getById(id);

  if (!blog) {
    logger.error(`Cannot find blog with id ${id}`);

    throw new Boom.notFound(`Cannot find blog with id ${id}`);
  }
  logger.info(`Updating the data for blog id ${id}`);

  await new Blog().updateById(id, {
    title: params.titleId,
    description : params.description
  });


  if (params.images?.added?.length) {
    params.images.added.forEach(async (url) => {
      await new BlogImage().save({ id, imageUrl: url });
    });
  }

  if (params.images?.removed?.length) {
    params.images.removed.forEach(async (url) => {
      await new BlogImage().removeByParams({ id, imageUrl: url });
    });
  }

  logger.info(`Fetching  the updated  data for blog id ${id}`);

  const updatedData = await new Blog().getBlogDetails(id);

  return {
    data: updatedData,
    message: 'Record updated successfully',
  };
}
export async function removeBlog(id) {
  logger.info(`Checking if blog with id ${id} exists`);

  const blog = await new Blog().getById(id);

  if (!blog) {
    logger.error(`Cannot delete blog with id ${id} because it doesnt exist`);

    throw new Boom.notFound(`Cannot delete blog with id ${id} because it doesnt exist`);
  }
 
 await new BlogImage().removeByParams({blogId: id});
  await new Blog().removeById(id);

  return {
    message: 'Record removed successfully.',
  };
}
