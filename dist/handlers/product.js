"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.showProduct = exports.index = void 0;
const products_1 = require("../models/products");
const PRODUCTS = new products_1.products();
const index = async (_req, res) => {
    try {
        const theProducts = await PRODUCTS.index();
        res.status(200).json({ ...theProducts });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.index = index;
const showProduct = async (req, res) => {
    try {
        const theProduct = await PRODUCTS.showProduct(req.params.productId);
        res.status(200).json({ ...theProduct });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.showProduct = showProduct;
const createProduct = async (req, res) => {
    try {
        const addNewProduct = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await PRODUCTS.createProduct(addNewProduct);
        res.json({
            productData: { ...newProduct },
            message: "products created successfully",
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res) => {
    try {
        await PRODUCTS.deleteProduct(req.params.productId);
        res.json({ message: "Product deleted successfully" });
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map