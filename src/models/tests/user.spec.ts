import db from "../../database";
import { user, users } from "../user";
// import { orderProducts, order, orders } from "../order";
// import { products, product } from "../products";

// const PRODUCTS = new products();
// const ORDERS = new orders();
const USERS = new users();

// USER MODEL TESTING
describe("Testing user model", () => {
	// User info for testing
	const testUser = {
		firstName: "test",
		lastName: "test",
		userName: "test123",
		password: "test12321",
	} as user;

	// Testing [ createUser ] method
	describe("create user", () => {
		it("method exists", () => {
			expect(USERS.createUser).toBeDefined();
		});

		it("creates user without errors", async () => {
			const newUser = await USERS.createUser(testUser);
			testUser.id = newUser.id;
			expect(newUser.id).toEqual(testUser.id);
			expect(newUser).toBeDefined();
		});
	});

	// Testing [ index ] method
	describe("Get all users", () => {
		it("method exists", () => {
			expect(USERS.index).toBeDefined();
		});
		it("returns all users", async () => {
			const allUsers = await USERS.index();
			expect(allUsers.length).toBe(1);
		});
	});

	// Testing [ getUser ] method
	describe("Get a user", () => {
		it("method exists", () => {
			expect(USERS.showUser).toBeDefined();
		});
		it("returns the correct user", async () => {
			const user: user = await USERS.showUser(testUser.id as string);
			expect(user).not.toBeNull();
			expect(user.id).toBe(testUser.id);
		});
	});

	// Testing [ auth ] method
	describe("Auth function", () => {
		it("Auth function exists", () => {
			expect(USERS.authentication).toBeDefined();
		});
		it("authenticates user", async () => {
			const userAuth = await USERS.authentication(
				testUser.userName as string,
				testUser.password as string
			);
			expect(userAuth).not.toBeNull();
		});
	});

	// Testing [ deleteUser ] method
	describe("Delete a user", () => {
		it("method exists", () => {
			expect(USERS.deleteUser).toBeDefined();
		});
		it("deletes the user from database", async () => {
			const deletedUser = await USERS.deleteUser(testUser.id as string);
			expect(deletedUser).toBeUndefined();
		});
	});

	// Testing [ addProduct ] method
	// describe("Adding products to user's order", () => {
	// 	it("method exists", () => {
	// 		expect(USERS.addProduct).toBeDefined();
	// 	});

	// 	const testProduct = {
	// 		name: "product test",
	// 		price: "1",
	// 	} as product;
	// 	it("creates products for testing", async () => {
	// 		const newProduct = await PRODUCTS.createProduct(testProduct);
	// 		testProduct.id = newProduct.id;
	// 	});

	// 	it("adds the product to the user's order", async () => {
	// 		const addProductToOrder = await USERS.addProduct(
	// 			testUser.id as string,
	// 			testProduct.id as string,
	// 			10
	// 		);
	// 		// expect(newProduct.id).toEqual(testProduct.id);
	// 		expect(addProductToOrder).not.toBeUndefined();
	// 	});
	// });

	// Deleting user after testing
	afterAll(async () => {
		const connect = await db.connect();
		await connect.query("DELETE FROM users");
		// await connect.query("DELETE FROM orders");
		// await connect.query("DELETE FROM products");
		connect.release();
	});
});
