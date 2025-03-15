
import { genSalt, hash } from 'bcrypt';

export const passwordHash = async (password: string, salt:string): Promise<string> => {
    try {
      
        const hashedPassword = await hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password");
    }
};
