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

	var orderId: string;

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
			orderId = newOrder.id;
		});
	});

	// Testing [ showOrder ] method
	describe("Show order", () => {
		it("method exists", () => {
			expect(ORDERS.showOrder).toBeDefined();
		});
		it("shows a specific order belongs to the user", async () => {
			const userOrder = await ORDERS.showOrder(
				testUser.id as string,
				orderId as string
			);
			expect(userOrder).not.toBeNull();
		});
	});

	// Testing [ showActiveOrder ] method
	describe("Show active order", () => {
		it("method exists", () => {
			expect(ORDERS.showActiveOrder).toBeDefined();
		});
		it("shows user's active order", async () => {
			const activeOrder = await ORDERS.showActiveOrder(testUser.id as string);
			expect(activeOrder.status).toEqual("active");
		});
	});

	// Testing [ changeStatus ] method
	describe("Change order status", () => {
		it("method exists", () => {
			expect(ORDERS.changeStatus).toBeDefined();
		});
		it("changes order status from 'active' to 'completed' ", async () => {
			const changeOrderStatus = await ORDERS.changeStatus(
				testUser.id as string
			);
			expect(changeOrderStatus).not.toBeNull();
		});
	});

	// Testing [ showUserOrders ] method
	describe("Show user orders", () => {
		it("method exists", () => {
			expect(ORDERS.showCompletedOrders).toBeDefined();
		});
		it("shows all user orders without errors", async () => {
			const orders = await ORDERS.showCompletedOrders(testUser.id as string);
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
