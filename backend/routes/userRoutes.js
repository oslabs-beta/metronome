import express from 'express';
const router = express.Router();

import userController from '../controller/userController.js';
import cookieController from '../controller/cookieController.js';

router.post('/register', userController.createUser, (req, res) =>{
    res.json('created user');
  });

router.post('/login', userController.getUser, cookieController.setCookie, (req, res)=>{
    res.status(200).json(req.cookies);
  });

  export default router;