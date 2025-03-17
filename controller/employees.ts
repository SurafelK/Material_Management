import { Request, Response } from "express";
import { CreateEmployeeInput } from "../dto/employee.dto";
import { EmployeeModel } from "../models/EmployeeModel";
import { isDate } from "util/types";


export const CreateEmployee = async (req:Request, res:Response) => {
    try {
        const {fname,lname, position, employmentDate} = <CreateEmployeeInput> req.body

        if(!fname || !lname || !position || !employmentDate || !isDate(employmentDate) ){
            res.status(400).json({message:"Please provide all required fields"})
            return
        }

        const newEmployee = new EmployeeModel({
            fname,
            lname,
            position,
            employmentDate
        })

        const saveEmployee = await newEmployee.save()
        if(!saveEmployee){
            res.status(400).json({message:"Couldn't save the employee data"})
            return
        }

        res.status(201).json({message: "Employee created successfully", saveEmployee})
        return
    } catch (error) {
        res.status(500).json({message: `Internal server error ${error}`})
        return
    }
}