import supertest from "supertest"
import {web} from "../src/application/web"
import {logger} from "../src/application/logging"
import { UserTest } from "./test-util"
import bcrypt from "bcrypt";

describe("POST /users", () => {
  afterAll(async () => {
    await UserTest.delete();
  });

  it("", async () => {
    const response = await supertest(web).post("/api/v1/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const response = await supertest(web).post("/api/v1/users").send({
      username: "test",
      password: "test",
      name: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /users/login", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it("", async () => {
    const response = await supertest(web).post("/api/v1/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  })

  it("", async () => {
    const response = await supertest(web).post("/api/v1/users/login").send({
      username: "user",
      password: "user",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })
});

describe("GET /users/current", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it("", async () => {
    const response = await supertest(web).get("/api/v1/users/current").set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it("", async () => {
    const response = await supertest(web).get("/api/v1/users/current").set("X-API-TOKEN", "...");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
})

describe("PATCH /users/current", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it("", async () => {
    const response = await supertest(web).patch("/api/v1/users/current").send({
      name: "",
      password: "",
    }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const response = await supertest(web).patch("/api/v1/users/current").send({
      name: "user",
    }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("user");
  });

  it("", async () => {
    const response = await supertest(web).patch("/api/v1/users/current").send({
      password: "user",
    }).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);

    const user = await UserTest.get();
    expect(await bcrypt.compare("user", user.password)).toBe(true);
  });

  it("", async () => {
    const response = await supertest(web).patch("/api/v1/users/current").send({
      name: "user",
    }).set("X-API-TOKEN", "...");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
})
