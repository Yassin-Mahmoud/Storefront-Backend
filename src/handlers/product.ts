import { Request, Response } from "express";
import { product, products } from "../models/products";

const PRODUCTS = new products();

// show products
export const index = async (_req: Request, res: Response): Promise<void> => {
	try {
		const theProducts = await PRODUCTS.index();
		res.status(200).json({ ...theProducts });
	} catch (err) {
		res.status(500).json(err);
	}
};

// show specific product
export const showProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const theProduct = await PRODUCTS.showProduct(req.params.id as string);
		res.status(200).json({ ...theProduct });
	} catch (err) {
		res.status(500).send(err);
	}
};

// create product
export const createProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const addNewProduct: product = {
			name: req.body.name as string,
			price: req.body.price as string,
		};
		const newProduct = await PRODUCTS.createProduct(addNewProduct);
		res.json({
			productData: { ...newProduct },
			message: "products created successfully",
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

// delete product
export const deleteProduct = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		await PRODUCTS.deleteProduct(req.params.id as string);
		res.json({ message: "Product deleted successfully" });
	} catch (err) {
		res.status(500).send(err);
	}
};
