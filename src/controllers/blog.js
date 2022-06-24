import { query } from 'express';
import * as blogService from '../services/blog.js';
// import router from '../routes.js';
export function getBlogs(req, res, next) {
 blogService
 .getAllBlogs(req,query)
 .then((data)=> res.json(data))
 .catch((err)=> next(err));
  
}

export function getBlog(req, res, next) {
  blogService
 .getBlog(+req.params.blogIdentifier)
 .then((data)=> res.json(data))
 .catch((err)=> next(err));
  }

export function saveBlog(req, res, next) {
  console.log('inside controller: ', req.body);
 blogService
 .addBlog(req.body)
 .then((data) => res.json(data))
 .catch((err)=>{
  next(err);
 });
}

export function updateBlog(req, res, next) {
  blogService
  .updateBlog(+req.params.blogIdentifier, req.body)
  .then((data) => res.json(data))
  .catch((err) => next(err));
}

export function removeBlog(req, res, next) {
  blogService
  .removeBlog(+req.params.blogIdentifier)
  .then((data)=> res.json(data))
  .catch((err)=> next(err));
}
