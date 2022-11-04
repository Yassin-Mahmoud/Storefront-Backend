import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // get token from header
        const authHeader = req.headers.authorization;
        // check if auth header exists
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET_TOKEN as string);
            next();
        } else {
            throw new Error("no authHeader [ not authenticated ]");
        }
    } catch (err) {
        throw new Error(`token verify error: ${err}`);
    }
};

export default verifyToken;
