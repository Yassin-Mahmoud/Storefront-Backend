"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const products_1 = require("../products");
const PRODUCTS = new products_1.products();
describe("Testing products model", () => {
    const testProduct = {
        name: "Test Product",
        price: "10",
    };
    describe("Create products", () => {
        it("method exists", () => {
            expect(PRODUCTS.createProduct).toBeDefined();
        });
        it("Creates products without errors", async () => {
            const newProduct = await PRODUCTS.createProduct(testProduct);
            testProduct.id = newProduct.id;
            expect(newProduct).toBeDefined();
        });
    });
    describe("Show all products", () => {
        it("method exists", () => {
            expect(PRODUCTS.index).toBeDefined();
        });
        it("shows all products without errors", async () => {
            const allProducts = await PRODUCTS.index();
            expect(allProducts.length).toBe(1);
        });
    });
    describe("Shows a specific product", () => {
        it("method exists", () => {
            expect(PRODUCTS.showProduct).toBeDefined();
        });
        it("shows a specific product without errors", async () => {
            const product = await PRODUCTS.showProduct(testProduct.id);
            expect(product).not.toBeNull();
            expect(testProduct.name).toBe(product.name);
        });
    });
    describe("delete a product", () => {
        it("method exists", () => {
            expect(PRODUCTS.deleteProduct).toBeDefined();
        });
        it("deletes a product without errors", async () => {
            const deletedProduct = await PRODUCTS.deleteProduct(testProduct.id);
            expect(deletedProduct).toBeUndefined();
        });
    });
    afterAll(async () => {
        const connect = await database_1.default.connect();
        const sql = "DELETE FROM products";
        await connect.query(sql);
        connect.release();
    });
});
//# sourceMappingURL=product.spec.js.map