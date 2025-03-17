import express from "express";
import { createUser, myProfile, userLogin } from "../controller/userController";
import { isAdmin } from "../Middlewares/AdminMiddleware";
import { isAuth } from "../Middlewares/authMiddleware";
const router = express.Router()

router.post( '/create',isAdmin, createUser )
router.post( '/login', userLogin )
router.get('/profile', isAuth, myProfile )

export { router as UserRouter }