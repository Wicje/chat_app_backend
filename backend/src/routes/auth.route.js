import express from 'express';
import {login, logout, signup} from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("signup", signup);

router.post("login", login);

router.post("/logout", logout);



router.put("/update-profile", protectRoute, updateProfile);

//This router will check if user is authenticated
router.get("/check", protectRoute, checkAuth);

export default router;
