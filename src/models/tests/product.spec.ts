import db from "../../database";
import { products, product } from "../products";

const PRODUCTS = new products();

describe("Testing products model", () => {
	const testProduct = {
		name: "Test Product",
		price: "10",
	} as product;

	// Testing [ createProduct ] method
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

	// Testing [ index ] method
	describe("Show all products", () => {
		it("method exists", () => {
			expect(PRODUCTS.index).toBeDefined();
		});
		it("shows all products without errors", async () => {
			const allProducts = await PRODUCTS.index();
			expect(allProducts.length).toBe(1);
		});
	});

	// Testing [ showProduct ] method
	describe("Shows a specific product", () => {
		it("method exists", () => {
			expect(PRODUCTS.showProduct).toBeDefined();
		});
		it("shows a specific product without errors", async () => {
			const product = await PRODUCTS.showProduct(testProduct.id as string);
			expect(product).not.toBeNull();
			expect(testProduct.name).toBe(product.name);
		});
	});

	// Testing [ deleteProduct ] method
	describe("delete a product", () => {
		it("method exists", () => {
			expect(PRODUCTS.deleteProduct).toBeDefined();
		});
		it("deletes a product without errors", async () => {
			const deletedProduct = await PRODUCTS.deleteProduct(
				testProduct.id as string
			);
			expect(deletedProduct).toBeUndefined();
		});
	});

	afterAll(async () => {
		const connect = await db.connect();
		const sql = "DELETE FROM products";
		await connect.query(sql);
		connect.release();
	});
});
