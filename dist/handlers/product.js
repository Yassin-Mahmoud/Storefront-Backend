"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.showProduct = exports.index = void 0;
const products_1 = require("../models/products");
const PRODUCTS = new products_1.products();
const index = async (_req, res) => {
    const theProducts = PRODUCTS.index();
    res.json(theProducts);
};
exports.index = index;
const showProduct = async (req, res) => {
    const theProduct = PRODUCTS.showProduct(req.params.id);
    res.json(theProduct);
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
            productData: { newProduct },
            message: "products created successfully",
        });
    }
    catch (err) {
        res.status(200).json(err);
    }
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res) => {
    const deleted = PRODUCTS.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map