import express from 'express'
import {createUser,loginUser} from '../controller/userControler.js'
// import { authMiddleware } from '../middleware/auth.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login',loginUser);

router.get('/ping', (req, res) => {
  res.json({ message: 'Server is alive!' });
});


export default router