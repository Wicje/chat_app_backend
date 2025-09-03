import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller';
import { protectRoute } from '../middleware/auth.middlewar';

const router = Router();

router.post("signup", signup);

router.post("login", login);

router.post("/logout", logout);

//This router will check if user is authenticated
router.get("/check", protectRoute, checkAuth);

export default router;
