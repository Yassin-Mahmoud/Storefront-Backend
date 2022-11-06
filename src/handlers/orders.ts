import { Request, Response } from "express";
import { orders } from "../models/order";

const ORDERS = new orders();

// show user completed orders
export const showUserCompletedOrders = (req: Request, res: Response) => {
	try {
		const userOrders = ORDERS.showCompletedOrders(req.params.userId);
		res.status(200).json({ ...userOrders });
	} catch (err) {
		res.status(500).send(err);
	}
};

// show active order
export const showActiveOrder = (req: Request, res: Response) => {
	try {
		const activeOrder = ORDERS.showActiveOrder(req.params.userId);
		res.status(200).json(activeOrder);
	} catch (err) {
		res.status(500).send(err);
	}
};

// change active status
export const changeStatus = async (req: Request, res: Response) => {
	try {
		const status = await ORDERS.changeStatus(req.params.userId);
		res.status(200).json({ status });
	} catch (err) {
		res.status(500).send(err);
	}
};
