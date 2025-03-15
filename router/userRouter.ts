import express from "express";
import { createUser } from "../controller/userController";
const router = express.Router()

router.post( '/create', createUser )

export { router as UserRouter }