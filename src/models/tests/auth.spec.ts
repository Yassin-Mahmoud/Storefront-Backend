import { users, user } from "../../models/user";
import db from "../../database";

const USERS = new users();

describe("Auth function", () => {
  it("Auth function exists", () => {
    expect(USERS.authentication).toBeDefined();
  });

  describe("Testing user auth", () => {
    const user = {
      firstName: "test",
      lastName: "test00",
      userName: "test123",
      password: "test12321"
    }

    beforeAll(async () => {
      const newUser = await USERS.createUser(user);
    })

    // afterAll(async () => {
      
    //   await USERS.deleteUser(user);
    // })
  
});
