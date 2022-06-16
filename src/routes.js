import { Router } from 'express';

import connection from './knexfile.js';
import loginSchema from './schemas/login.js';

import updateBlogSchema from './schemas/addUser.js';
import addUserSchema from './schemas/addUser.js';

import * as apiController from './controllers/api.js';
import authenticate from './middlewares/authenticate.js';
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

router.get('/blogs/:blogIdentifier', authenticate, blogController.getBlog);

// router.get('/blogs/:blogIdentifier', blogController.getBlog);

router.post('/blogs', authenticate, validateBody(addBlogSchema), blogController.saveBlog);

router.put('/blogs/:blogIdentifier', authenticate, validateBody(updateBlogSchema), blogController.updateBlog);

router.delete('/blogs/:blogIdentifier', authenticate, blogController.removeBlog);

router.post('/users', validateBody(addUserSchema), userController.addUser);

router.post('/login', validateBody(loginSchema), userController.login);

export default router;
