import express from 'express';
import userController from '../controllers/userController.js';
import { authMiddleware, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, adminOnly, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/block/:id', authMiddleware, userController.blockUser);

export default router;