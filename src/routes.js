import { Router } from 'express';
import {expressjwt} from 'express-jwt';

import connection from './knexfile.js';
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

const router = Router();

// router.get('/', (req, res, next) =>{
//     res.send('This is the response from the index(/) route');

// });
router.get('/', apiController.getAPIDetails);

router.get('/abcd', async (req, res, next) => {
  console.log(connection);
  const data = await connection('blogs').select('*');
  // console.log(req.baseUrl);
  // res.send('hello this');
  console.log(data);
  res.json(data);
});

router.get('/blogs', validateQueryParams(getBlogsQuerySchema), blogController.getBlogs);

router.get('/blogs/:blogIdentifier', blogController.getBlog);

// router.get('/blogs/:blogIdentifier', blogController.getBlog);

router.post('/blogs', validateBody(addBlogSchema), blogController.saveBlog);

router.put('/blogs/:blogIdentifier', validateBody(updateBlogSchema), blogController.updateBlog);

router.delete('/blogs/:blogIdentifier', blogController.removeBlog);

router.post('/users', validateBody(addUserSchema), userController.addUser);

router.post('/login', validateBody(loginSchema), userController.login);

router.post('/register', validateBody(registerSchema), userController.register);

export default router;
