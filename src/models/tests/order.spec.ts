import db from "../../database";
import { orders, order } from "../order";
import { user, users } from "../user";

const ORDERS = new orders();
const USERS = new users();

describe("Testing orders model", () => {
	// User info for testing
	const testUser = {
		firstName: "test3",
		lastName: "test3",
		userName: "test333",
		password: "test12321",
	} as user;

	// Testing [ createOrder ] method
	describe("Create Order", () => {
		it("method exists", () => {
			expect(ORDERS.createOrder).toBeDefined();
		});
		it("creates a user for testing user orders", async () => {
			const newUser = await USERS.createUser(testUser);
			testUser.id = newUser.id;
		});
		it("creates orders without errors", async () => {
			const newOrder = await ORDERS.createOrder(testUser.id as string);
			expect(newOrder).toBeDefined();
		});
	});

	// Testing [ showUserOrders ] method
	describe("Show user orders", () => {
		it("method exists", async () => {
			expect(ORDERS.showUserOrders).toBeDefined();
		});
		it("shows all user orders without errors", async () => {
			const orders = await ORDERS.showUserOrders(testUser.id as string);
			expect(orders).not.toBeNull();
		});
	});

	afterAll(async () => {
		const connect = await db.connect();
		await connect.query("DELETE FROM orders");
		await connect.query("DELETE FROM users");
		connect.release();
	});
});
