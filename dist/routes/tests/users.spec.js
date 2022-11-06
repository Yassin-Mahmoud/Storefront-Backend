"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../../models/user");
const order_1 = require("../../models/order");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
const USERS = new user_1.users();
const ORDERS = new order_1.orders();
describe("Testing endpoints", () => {
    const testUser = {
        firstName: "test",
        lastName: "test",
        userName: "test123",
        password: "test12321",
    };
    var token;
    var productId;
    var orderId;
    beforeAll(async () => {
        const newUser = await USERS.createUser(testUser);
        testUser.id = newUser.id;
        const newOrder = await ORDERS.createOrder(testUser.id);
        orderId = newOrder.id;
    });
    describe("Testing users endpoint", () => {
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
        it("Should be able to authenticate a user", async () => {
            const response = await request.post("/users/authentication").send({
                userName: testUser.userName,
                password: testUser.password,
            });
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            const { id, token: accessToken } = response.body.userInfo;
            expect(id).toBe(testUser.id);
            token = accessToken;
        });
        it("Should be able to show all users", async () => {
            const response = await request
                .get("/users")
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });
        it("Should be able to show a user", async () => {
            const response = await request
                .get(`/users/${testUser.id}/account`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.userInfo.id).toBe(testUser.id);
        });
        it("Should be able to delete a user", async () => {
            const response = await request
                .delete(`/users/${testUser.id}/delete`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.message).toBe("user deleted successfully");
        });
    });
    describe("Testing products endpoint", () => {
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
        it("Should be able to show all products", async () => {
            const response = await request.get("/products");
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });
        it("Should be able to show a product", async () => {
            const response = await request
                .get(`/products/${productId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.id).toBe(productId);
        });
        it("Should be able to delete a product", async () => {
            const response = await request
                .delete(`/products/delete/${productId}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body.message).toBe("Product deleted successfully");
        });
    });
    describe("Testing orders endpoint", () => {
        it("Should be able to show active order", async () => {
            const response = await request
                .get(`/orders/active/user/${testUser.id}`)
                .set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });
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
        const connect = await database_1.default.connect();
        await connect.query("DELETE FROM users");
        await connect.query("DELETE FROM orders");
        await connect.query("DELETE FROM products");
        connect.release();
    });
});
//# sourceMappingURL=users.spec.js.map