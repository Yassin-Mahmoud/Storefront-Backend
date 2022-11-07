import { Request, Response } from "express";
import { user, users } from "../models/user";
import jwt from "jsonwebtoken";

const USERS = new users();

// show users
export const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const theUsers = await USERS.index();
		res.status(200).json({ ...theUsers });
	} catch (err) {
		res.status(500).send(err);
	}
};

// show a specific user
export const showUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const theUser = await USERS.showUser(req.params.id as string);
		res.json({
			userInfo: { ...theUser },
		});
	} catch (err) {
		res.status(500).send(err);
	}
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
		const token = jwt.sign(addNewUser, process.env.SECRET_TOKEN as string);
		res.status(200).json({
			new_user: { ...newUser, token },
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
	try {
		await USERS.deleteUser(req.params.id as string);
		res.json({
			message: "user deleted successfully",
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

// add products to order
export const addProducts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const addProduct = await USERS.addProduct(
			req.params.userId as string,
			req.body.productId as string,
			req.body.quantity as number
		);
		res.status(200).json({
			addedProduct: { ...addProduct },
			message: "product added",
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

// authentication
export const authenticate = async (req: Request, res: Response) => {
	try {
		const auth = await USERS.authentication(
			req.body.userName as string,
			req.body.password as string
		);
		const token = jwt.sign(auth, process.env.SECRET_TOKEN as string);
		return res.status(200).json({
			userInfo: { ...auth, token },
			message: "you are authenticated",
		});
	} catch (err) {
		throw new Error(`you are not authenticated: ${err}`);
	}
};
