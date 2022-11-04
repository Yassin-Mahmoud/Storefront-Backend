import { Request, Response } from "express";
import { product, products } from "../models/products";

const PRODUCTS = new products();

// show products
export const index = async (_req: Request, res: Response) => {
    const theProducts = PRODUCTS.index();
    res.json(theProducts);
};

// show specific product
export const showProduct = async (req: Request, res: Response) => {
    const theProduct = PRODUCTS.showProduct(req.params.id as string);
    res.json(theProduct);
};

// create product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const addNewProduct: product = {
            name: req.body.name as string,
            price: req.body.price as string,
        };
        const newProduct = await PRODUCTS.createProduct(addNewProduct);
        res.json({
            productData: { newProduct },
            message: "products created successfully",
        });
    } catch (err) {
        res.status(200).json(err);
    }
};

// delete product
export const deleteProduct = async (req: Request, res: Response) => {
    const deleted = PRODUCTS.deleteProduct(req.params.id as string);
    res.json({ message: "Product deleted successfully" });
};
