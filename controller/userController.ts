import { Request, Response } from "express";
import { CreateUser, CustomRequest, loginUser } from "../dto/user.dto";
import { genSalt } from "bcrypt";
import { checkPassword, generateSignedToken, passwordHash } from "../Auth/auth.utils";
import {  UserModel } from "../models/UserModel";

export const createUser = async (req:Request, res:Response) => {
    try {
        const { email,name,password} = <CreateUser> req.body
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
            await user.save()
            res.status(201).json({message: "User created successfully", user})
            return
        } else {
            res.status(400).json({ message: "Password is required" });
            return
        }
    } catch (error) {
        res.status(500).json({message: `Server error ${error}`})
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = <loginUser>req.body;

        if(!email || !password){
            res.status(400).json({message: "Invalid or no credentials"})
            return
        }

        const user = await UserModel.findOne({ email: email }) ;
        if(!user){
            res.status(400).json({message:"No or invalid credentials"})
            return
        }

        const checkPass = await checkPassword(password, user.salt , user.password )

        if(!checkPass){
            res.status(400).json({message:"No or invalid credentials"})
            return
        }

        const token = await generateSignedToken(user._id);
        res.status(200).json({message: "Successfully logged in",  token})
        return

    } catch (error) {
        res.status(500).json({message: "Internal server error",  error})
        return
    }
}

export const myProfile = async (req:CustomRequest, res:Response )=> {
    try {
        const user = req.user

        const profile = await UserModel.findById(user.userId)
        res.status(200).json({message: "Profile",profile})
        return
    } catch (error) {
        res.status(500).json({message: `Internal server error ${error}`})
        return
    }
}