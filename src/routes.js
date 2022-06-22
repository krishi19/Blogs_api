import { Router } from 'express';
import {expressjwt} from 'express-jwt';
import tokenMiddleware from './middlewares/token_middleware.js';

import db from "../db/db.js";
import loginSchema from './schemas/login.js';
import registerSchema from './schemas/register_schema.js';

import updateBlogSchema from './schemas/addUser.js';
import addUserSchema from './schemas/addUser.js';

import * as apiController from './controllers/api.js';
// import authCheck from './middlewares/authenticate.js';
import * as userController from './controllers/user.js';

import * as blogController from './controllers/blog.js';
import addBlogSchema from './schemas/addBlog.js';
import getBlogsQuerySchema from './schemas/getBlogsQuery.js';

import { validateBody, validateQueryParams } from './middlewares/validation.js';
import uploadFile from './fileUpload/file_upload.js';

const router = Router();

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

router.get('/blogs',tokenMiddleware, blogController.getBlogs);

router.get('/blogs/:blogIdentifier',tokenMiddleware, blogController.getBlog);

// router.get('/blogs/:blogIdentifier', blogController.getBlog);
// validateBody(addBlogSchema)
router.post('/blogs', uploadFile.single('recfile'), tokenMiddleware ,validateBody(addBlogSchema), blogController.saveBlog);

router.put('/blogs/:blogIdentifier',tokenMiddleware, validateBody(updateBlogSchema), blogController.updateBlog);

router.delete('/blogs/:blogIdentifier',tokenMiddleware, blogController.removeBlog);

// router.post('/users',tokenMiddleware, validateBody(addUserSchema), userController.addUser);

router.post('/login', validateBody(loginSchema), userController.login);

router.post('/register', validateBody(registerSchema), userController.register);

export default router;
