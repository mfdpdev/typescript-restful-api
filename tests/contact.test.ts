import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("", () => {
  afterEach(async () => {
    await ContactTest.delete();
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.create();
  })

  it("", async () => {
    const response = await supertest(web).post("/api/v1/contacts").set("X-API-TOKEN", "test").send({
      "first_name": "user",
      "last_name": "user",
      "email": "user@example.com",
      "phone": "666",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("user");
  });

  it("", async () => {
    const response = await supertest(web).post("/api/v1/contacts").set("X-API-TOKEN", "test").send({
      "first_name": "user",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("user");
  });

  it("", async () => {
    const response = await supertest(web).post("/api/v1/contacts").set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
