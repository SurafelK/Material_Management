import express from "express";
import { createUser, userLogin } from "../controller/userController";
const router = express.Router()

router.post( '/create', createUser )
router.post( '/login', userLogin )

export { router as UserRouter }