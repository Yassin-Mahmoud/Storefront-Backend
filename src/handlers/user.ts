import { Request, Response } from "express";
import { user, users } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const USERS = new users();

// show users
export const index = async (_req: Request, res: Response): Promise<void> => {
    const theUsers = await USERS.index();
    res.json(theUsers);
};

// show a specific user
export const showUser = async (req: Request, res: Response): Promise<void> => {
    const theUser = await USERS.showUser(req.params.id as string);
    res.json(theUser);
};

// create new user
export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const addNewUser: user = {
            firstName: req.body.firstName as string,
            lastName: req.body.lastName as string,
            userName: req.body.userName as string,
            password: req.body.password as string,
        };
        const newUser = await USERS.createUser(addNewUser);
        res.status(200).json({
            new_user: { ...newUser },
            message: "User created successfully",
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
};

// delete user
export const deleteUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const deleted = await USERS.deleteUser(req.params.id as string);
    res.json({
        message: "user deleted successfully",
    });
};

// add products to order
export const addProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    const addProduct = await USERS.addProduct(
        req.params.userId as string,
        req.body.productId as string,
        req.body.quantity as number
    );
    res.json({
        product: { ...addProduct },
        message: "product added",
    });
};

// authentication
export const authenticate = async (req: Request, res: Response) => {
    try {
        const login = await USERS.authentication(
            req.body.userName as string,
            req.body.password as string
        );
        const token = jwt.sign(login, process.env.SECRET_TOKEN as string);
        return res.json({
            userInfo: { ...login, token },
            message: "you are authenticated",
        });
    } catch (err) {
        throw new Error(`you are not authenticated: ${err}`);
    }
};
