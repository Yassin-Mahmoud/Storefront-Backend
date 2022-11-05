import { Request, Response } from "express";
import { orders } from "../models/order";

const ORDERS = new orders();

// show all users orders
export const showUserCompletedOrders = (req: Request, res: Response) => {
	const userOrders = ORDERS.showCompletedOrders(req.params.userId);
	res.json(userOrders);
};

// show a specific order for a user
export const showOrder = (req: Request, res: Response) => {
	const theOrder = ORDERS.showOrder(req.params.orderid, req.params.userid);
	res.json(theOrder);
};

// show active order
export const showActiveOrder = (req: Request, res: Response) => {
	const activeOrder = ORDERS.showActiveOrder(req.params.userId);
	res.json(activeOrder);
};

// change active status
export const changeStatus = async (req: Request, res: Response) => {
	const status = await ORDERS.changeStatus(req.params.userId);
	res.json(status);
};
