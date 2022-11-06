// import db from "../../database";
// import app from "../index";
// import { users, user } from "../../models/user";
// import { order, orders } from "../../models/order";
// import supertest from "supertest";

// const request = supertest(app);
// const ORDERS = new orders();
// const USERS = new users();

// // Orders endpoint testing
// describe("Orders endpoint", () => {
// 	const testUser = {
// 		firstName: "test",
// 		lastName: "test",
// 		userName: "test123",
// 		password: "test12321",
// 	} as user;

// 	var orderId;
// 	var token: string;

// 	beforeAll(async () => {
// 		const newUser = await USERS.createUser(testUser);
// 		testUser.id = newUser.id;
// 		const newOrder = await ORDERS.createOrder(testUser.id as string);
// 		orderId = newOrder.id;
// 	});
// 	// auth test user
// 	it("auth testing user", async () => {
// 		const response = await request
// 			.post("/users/authentication")
// 			.send({
// 				userName: testUser.userName,
// 				password: testUser.password,
// 			})
// 			.set("Content-type", "application/json");
// 		expect(response.status).toBe(200);
// 		expect(response.body).toBeInstanceOf(Object);
// 		const { id, token: accessToken } = response.body.userInfo;
// 		expect(id).toBe(testUser.id);
// 		token = accessToken;
// 	});

// 	// Testing [ show active order ] endpoint
// 	it("show user's active order", async () => {
// 		const response = await request
// 			.post("orders/user/${testUser.id}/activeorder")
// 			.set("Authorization", `Bearer ${token}`);
// 		expect(response.status).toBe(200);
// 		expect(response.body.status).toBe("active");
// 	});

// 	afterAll(async () => {
// 		const connect = await db.connect();
// 		await connect.query("DELETE FROM users");
// 		await connect.query("DELETE FROM orders");
// 		connect.release();
// 	});
// });
