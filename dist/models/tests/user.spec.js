"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
const user_1 = require("../user");
const products_1 = require("../products");
const PRODUCTS = new products_1.products();
const USERS = new user_1.users();
describe("Testing user model", () => {
    const testUser = {
        firstName: "test",
        lastName: "test",
        userName: "test123",
        password: "test12321",
    };
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
    describe("Get all users", () => {
        it("returns all users", async () => {
            const allUsers = await USERS.index();
            expect(allUsers.length).toBe(1);
        });
    });
    describe("Get a user", () => {
        it("method exists", () => {
            expect(USERS.showUser).toBeDefined();
        });
        it("returns the correct user", async () => {
            const user = await USERS.showUser(testUser.id);
            expect(user).not.toBeNull();
            expect(user.id).toBe(testUser.id);
        });
    });
    describe("Auth function", () => {
        it("Auth function exists", () => {
            expect(USERS.authentication).toBeDefined();
        });
        it("authenticates user", async () => {
            const userAuth = await USERS.authentication(testUser.userName, testUser.password);
            expect(userAuth).not.toBeNull();
        });
    });
    describe("Adding products to user's order", () => {
        it("method exists", () => {
            expect(USERS.addProduct).toBeDefined();
        });
        const testProduct = {
            name: "product test",
            price: "1",
        };
        it("creates products for testing", async () => {
            const newProduct = await PRODUCTS.createProduct(testProduct);
            testProduct.id = newProduct.id;
        });
        it("add the product to the user's order", async () => {
            const addProductToOrder = await USERS.addProduct(testUser.id, testProduct.id, 10);
            expect(addProductToOrder).toBeDefined();
        });
    });
    describe("Delete a user", () => {
        it("method exists", () => {
            expect(USERS.deleteUser).toBeDefined();
        });
        it("deletes the user from database", async () => {
            const deletedUser = await USERS.deleteUser(testUser.id);
            expect(deletedUser).toBeUndefined();
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
//# sourceMappingURL=user.spec.js.map