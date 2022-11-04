import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("Server is running without errors", () => {
  it("server runs with code 200", async () => {
    const response = await request.get("/")
    expect(response.status).toBe(200);
  })
})