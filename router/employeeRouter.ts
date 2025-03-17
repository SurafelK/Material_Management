import express from "express";
import { isAdmin } from "../Middlewares/AdminMiddleware";
import { CreateEmployee } from "../controller/employees";

const router = express.Router()
router.post('/create', isAdmin, CreateEmployee)

export { router as EmployeeRouter}