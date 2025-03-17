import mongoose, {Document, model, Schema } from "mongoose";

interface IEmployee extends Document {
    fname: string,
    lname : string,
    position: string,
    employmentDate: string
}

const employeeSchema = new Schema({
    fname: {type: String, required: true, min:3, max:20},
    lname: {type: String, required: true, min:3, max:20},
    position: {type:String, required: true, min:3, max:20},
    employmentDate: {type:Date, require: true}
})

const employeeModel = model <IEmployee> ( "EmployeeModel", employeeSchema )

export {employeeModel as EmployeeModel}