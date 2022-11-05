import { users, user } from "../../models/user";
import db from "../../database";

const USERS = new users();

// describe("Auth function", () => {
// 	it("Auth function exists", () => {
// 		expect(USERS.authentication).toBeDefined();
// 	});

// 	describe("Testing user auth", () => {
// 		const user = {
// 			firstName: "test",
// 			lastName: "test00",
// 			userName: "test123",
// 			password: "test",
// 		} as user;

// 		beforeAll(async () => {
// 			await USERS.createUser(user);
// 		});

// 		it("authenticates user", async () => {
// 			const userAuth = await USERS.authentication(
// 				user.userName as string,
// 				user.password as string
// 			);
// 			expect(userAuth.userName).toBe(user.userName);
// 			expect(userAuth.password).toBe(user.password);
// 		});

// 		afterAll(async () => {
// 			const connect = await db.connect();
// 			const sql = "DELETE * FROM users";
// 			const result = await connect.query(sql);
// 			connect.release();
// 		});
// 	});
// });
