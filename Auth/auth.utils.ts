
import jwt from "jsonwebtoken";

import { genSalt, hash } from 'bcrypt';

export const passwordHash = async (password: string, salt:string): Promise<string> => {
    try {
        const hashedPassword = await hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password");
    }
};

export const checkPassword = async( password:string, salt:string, hashedPass:string ): Promise <Boolean> => {
    const hashed = await passwordHash(password, salt)

    if(hashed === hashedPass){
        return true
    }

    return false
}

export const generateSignedToken = async (userId: any): Promise<string | null> => {
    try {
        userId = userId.toString()
        const jwtSecret = process.env.JWT_SECRET as string; // Ensure JWT secret is defined
        if (!jwtSecret) throw new Error("JWT_SECRET is not defined");

        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "1d" }); // Fix expiresIn format
        return token;
    } catch (error) {
        console.error("Error generating JWT:", error);
        return null; // Return null in case of failure
    }
};