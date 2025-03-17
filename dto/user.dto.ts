import { Request } from "express";

// src/dto/user.dto.ts
export interface CreateUser {
    name: string;
    email: string;
    password: string;
    salt:string ,
    role: string
  }
  
  export interface UpdateUser {
    name?: string;
    email?: string;
    password?: string;
  }
  
  export interface loginUser{
    email:string,
    password:string
  }
 
export interface CustomRequest extends Request {
    user?: any; // Replace 'any' with a proper User type if you have one
}
