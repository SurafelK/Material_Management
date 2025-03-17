import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; // Ensure you have jsonwebtoken installed

// Extend Express Request type
interface AuthenticatedRequest extends Request {
    user?: any; // Change 'any' to a more specific type if you have a User interface
}

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(400).json({ message: "No token provided" });
            return
        }

        const token = authHeader.split(" ")[1];

        const secretKey = process.env.JWT_SECRET || "yourSecretKey"; // Use environment variables
        const decoded: any = jwt.verify(token, secretKey); 

        if (!decoded || decoded.role !== "admin") {
            res.status(403).json({ message: "Access denied. Admins only." });
            return
        }

        req.user = decoded; // Attach decoded data to the request
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return
    }
};
