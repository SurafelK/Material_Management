import { Request, Response } from "express";
import { CreateUser } from "../dto/user.dto";
import { genSalt } from "bcrypt";
import { passwordHash } from "../Auth/auth.utils";
import { UserModel } from "../models/UserModel";

export const createUser = async (req:Request, res:Response) => {
    try {
        const { email,name,password } = <CreateUser> req.body
        if(!email || !name || !password){
            res.status(400).json({message: "Please provide all information"})
            return
        }
        const salt = await genSalt(10);
        if (password) {
            const hashedPassword = await passwordHash(password, salt);
            const user = new UserModel({
                name: name,
                email: email,
                password: hashedPassword,
                salt: salt
            });
            if(!user){
                res.status(400).json({message: "Error while saving"})
                return
            }
            return
        } else {
            res.status(400).json({ message: "Password is required" });
            return
        }
    } catch (error) {
        res.status(500).json({message: `Server error ${error}`})
    }
}
