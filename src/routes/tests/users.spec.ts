import db from "../../database";
import { users, user } from "../../models/user";
import { orders } from "../../models/order";
import app from "../../server";
import supertest from "supertest";

const request = supertest(app);
const USERS = new users();
const ORDERS = new orders();

// endpoints testing
describe("Testing endpoints", () => {
	const testUser = {
		firstName: "test",
		lastName: "test",
		userName: "test123",
		password: "test12321",
	} as user;

	var token: string;
	var productId: string;
	var orderId: string;

	beforeAll(async () => {
		const newUser = await USERS.createUser(testUser);
		testUser.id = newUser.id;
		const newOrder = await ORDERS.createOrder(testUser.id as string);
		orderId = newOrder.id;
	});

	// Users endpoint testing
	describe("Testing users endpoint", () => {
		// Testing [ create user ] endpoint
		it("Should be able to create a new user", async () => {
			const response = await request.post("/users/createuser").send({
				firstName: "test0",
				lastName: "test0",
				userName: "test132",
				password: "test12321",
			});
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});

		// Testing [ authenticate ] endpoint
		it("Should be able to authenticate a user", async () => {
			const response = await request.post("/users/authentication").send({
				userName: testUser.userName as string,
				password: testUser.password as string,
			});
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			const { id, token: accessToken } = response.body.userInfo;
			expect(id).toBe(testUser.id);
			token = accessToken;
		});

		// Testing [ show all users ] endpoint
		it("Should be able to show all users", async () => {
			const response = await request
				.get("/users")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});

		// Testing [ show user ] endpoint
		it("Should be able to show a user", async () => {
			const response = await request
				.get(`/users/${testUser.id}/account`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.userInfo.id).toBe(testUser.id);
		});

		// Testing [ delete user ] endpoint
		it("Should be able to delete a user", async () => {
			const response = await request
				.delete(`/users/${testUser.id}/delete`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.message).toBe("user deleted successfully");
		});
	});

	// Products endpoint testing
	describe("Testing products endpoint", () => {
		// Testing [ create product ] endpoint
		it("Should be able to create a new product", async () => {
			const response = await request
				.post("/products/createproduct")
				.set("Authorization", `Bearer ${token}`)
				.send({
					name: "product for testing",
					price: "100",
				});
			productId = response.body.productData.id;
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});

		// Testing [ show products ] endpoint
		it("Should be able to show all products", async () => {
			const response = await request.get("/products");
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});

		// Testing [ show product ] endpoint
		it("Should be able to show a product", async () => {
			const response = await request
				.get(`/products/${productId}`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.id).toBe(productId);
		});

		// Testing [ delete product ] endpoint
		it("Should be able to delete a product", async () => {
			const response = await request
				.delete(`/products/delete/${productId}`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.message).toBe("Product deleted successfully");
		});
	});

	// Orders endpoint testing
	describe("Testing orders endpoint", () => {
		// Testing [ show active order ] endpoint
		it("Should be able to show active order", async () => {
			const response = await request
				.get(`/orders/active/user/${testUser.id}`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});

		// Testing [ change status ] endpoint
		it("Should be able to change order status to 'completed'", async () => {
			const response = await request
				.put(`/orders/user/${testUser.id}/ordercompleted`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.status).toBe("completed");
		});
	});

	afterAll(async () => {
		const connect = await db.connect();
		await connect.query("DELETE FROM users");
		await connect.query("DELETE FROM orders");
		await connect.query("DELETE FROM products");
		connect.release();
	});
});
