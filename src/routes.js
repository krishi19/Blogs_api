// import { Router } from 'express';
import express from 'express';
import {expressjwt} from 'express-jwt';
import tokenMiddleware from './middlewares/token_middleware.js';

import db from "../db/db.js";
import loginSchema from './schemas/login.js';
import registerSchema from './schemas/register_schema.js';

import updateBlogSchema from './schemas/addBlog.js';
import addUserSchema from './schemas/addUser.js';

import * as apiController from './controllers/api.js';
// import authCheck from './middlewares/authenticate.js';
import * as userController from './controllers/user.js';

import * as blogController from './controllers/blog.js';
import addBlogSchema from './schemas/addBlog.js';
import getBlogsQuerySchema from './schemas/getBlogsQuery.js';
import upload from './fileUpload/file_upload.js';
import server from './index.js';
import Boom from '@hapi/boom';

import { validateBody, validateQueryParams } from './middlewares/validation.js';
// import{uploadSingleFile, uploadMultiFile, deleteSingleFile} from './fileUpload/file_upload.js';
// import multerData from './fileUpload/file_upload.js';

const router = express.Router();

// router.get('/', (req, res, next) =>{
//     res.send('This is the response from the index(/) route');

// });
router.get('/', apiController.getAPIDetails);

router.get('/abcd', async (req, res, next) => {
  console.log(db);
  const data = await db('blogs').select('*');
  // console.log(req.baseUrl);
  // res.send('hello this');
  console.log(data);
  res.json(data);
});

router.get('/blogs', blogController.getBlogs);

router.get('/blogs/:blogIdentifier', blogController.getBlog);

// router.get('/blogs/:blogIdentifier', blogController.getBlog);
// validateBody(addBlogSchema)
router.post('/blogs' ,validateBody(addBlogSchema), blogController.saveBlog);

router.put('/blogs/:blogIdentifier',tokenMiddleware, validateBody(updateBlogSchema), blogController.updateBlog);

router.delete('/blogs/:blogIdentifier',tokenMiddleware, blogController.removeBlog);

// router.post('/users',tokenMiddleware, validateBody(addUserSchema), userController.addUser);

router.post('/login', validateBody(loginSchema), userController.login);

router.post('/register', validateBody(registerSchema), userController.register);

// router.post('/single-upload',tokenMiddleware, uploadSingleFile);

// router.post('/multi-upload',tokenMiddleware, uploadMultiFile);

// router.post('/delete-file',tokenMiddleware, deleteSingleFile);

router.post("/upload-image", (req, res) => {
  let serverAddress = server.address();
  console.log('server : ', req.secure, serverAddress.address.toString() == '0.0.0.0');
  let serverAddressWithPort = req.secure ? 'https://' : 'http://'+(serverAddress.address.toString() == '0.0.0.0' ? 'localhost' : serverAddress.address)+':' +serverAddress.port;
  console.log('ser ver add: ', serverAddressWithPort);
  upload(req, res, (err) => {
    if(err) {
      // res.status(400).send("Something went wrong!");
      // console.log('erorr on uploading image: ', err);
      return Boom.badRequest('Something went wrong!');
    }
    let fileDetails = req.file;
    console.log('req file details: ', fileDetails);
    fileDetails.fullPath = serverAddressWithPort+'/media/'+fileDetails.filename;
    res.json(
      {
        data: fileDetails,
        message: "Successfully uploaded image."
      }
    );
  });
});

export default router;
