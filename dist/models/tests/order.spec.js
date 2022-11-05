"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const order_1 = require("../order");
const user_1 = require("../user");
const ORDERS = new order_1.orders();
const USERS = new user_1.users();
describe("Testing orders model", () => {
    const testUser = {
        firstName: "test3",
        lastName: "test3",
        userName: "test333",
        password: "test12321",
    };
    var orderId;
    describe("Create Order", () => {
        it("method exists", () => {
            expect(ORDERS.createOrder).toBeDefined();
        });
        it("creates a user for testing user orders", async () => {
            const newUser = await USERS.createUser(testUser);
            testUser.id = newUser.id;
        });
        it("creates orders without errors", async () => {
            const newOrder = await ORDERS.createOrder(testUser.id);
            expect(newOrder).toBeDefined();
            orderId = newOrder.id;
        });
    });
    describe("Show order", () => {
        it("method exists", () => {
            expect(ORDERS.showOrder).toBeDefined();
        });
        it("shows a specific order belongs to the user", async () => {
            const userOrder = await ORDERS.showOrder(testUser.id, orderId);
            expect(userOrder).not.toBeNull();
        });
    });
    describe("Show active order", () => {
        it("method exists", () => {
            expect(ORDERS.showActiveOrder).toBeDefined();
        });
        it("shows user's active order", async () => {
            const activeOrder = await ORDERS.showActiveOrder(testUser.id);
            expect(activeOrder.status).toEqual("active");
        });
    });
    describe("Change order status", () => {
        it("method exists", () => {
            expect(ORDERS.changeStatus).toBeDefined();
        });
        it("changes order status from 'active' to 'completed' ", async () => {
            const changeOrderStatus = await ORDERS.changeStatus(testUser.id);
            expect(changeOrderStatus).not.toBeNull();
        });
    });
    describe("Show user orders", () => {
        it("method exists", () => {
            expect(ORDERS.showCompletedOrders).toBeDefined();
        });
        it("shows all user orders without errors", async () => {
            const orders = await ORDERS.showCompletedOrders(testUser.id);
            expect(orders).not.toBeNull();
        });
    });
    afterAll(async () => {
        const connect = await database_1.default.connect();
        await connect.query("DELETE FROM orders");
        await connect.query("DELETE FROM users");
        connect.release();
    });
});
//# sourceMappingURL=order.spec.js.map