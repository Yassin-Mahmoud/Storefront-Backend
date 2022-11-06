// import db from "../../database";
// import { product, products } from "../../models/products";
// import { user, users } from "../../models/user";
// import app from "../index";
// import supertest from "supertest";

// const request = supertest(app);
// const PRODUCTS = new products();
// const USERS = new users();

// var token;

// // Products endpoint testing
// describe("Testing products endpoint", () => {
// 	const testUser = {
// 		firstName: "test",
// 		lastName: "test",
// 		userName: "test123",
// 		password: "test12321",
// 	} as user;

// 	beforeAll(async () => {
// 		const newUser = await USERS.createUser(testUser);
// 		testUser.id = newUser.id;
// 	});

// 	// Testing [ authenticate ] endpoint
// 	it("Should be able to authenticate a user", async () => {
// 		const response = await request.post("/users/authentication").send({
// 			userName: testUser.userName as string,
// 			password: testUser.password as string,
// 		});
// 		expect(response.status).toBe(200);
// 		expect(response.body).toBeInstanceOf(Object);
// 		const { id, token: accessToken } = response.body.userInfo;
// 		expect(id).toBe(testUser.id);
// 		token = accessToken;
// 	});
// 	afterAll(async () => {
// 		const connect = await db.connect();
// 		await connect.query("DELETE FROM products");
// 		await connect.query("DELETE FROM users");
// 		connect.release();
// 	});
// });
