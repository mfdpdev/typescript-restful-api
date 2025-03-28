import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /contacts/:contactId/addresses", () => {
  afterEach(async () => {
    await AddressTest.deleteMany();
    await ContactTest.delete();
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  })

  it("", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).post(`/api/v1/contacts/${contact.id}/addresses`).set("X-API-TOKEN", "test").send({
      "street": "street",
      "city": "city",
      "province": "province",
      "country": "country",
      "postal_code": "1234",
    });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.street).toBe("street");
  });

  it("", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).post(`/api/v1/contacts/${contact.id}/addresses`).set("X-API-TOKEN", "test").send({});

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).post(`/api/v1/contacts/${contact.id}/addresses`).set("X-API-TOKEN", "test").send({
      "street": "",
      "city": "",
      "province": "",
      "country": "country",
      "postal_code": "1234",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /contacts/:contactId/addresses/:addressId", () => {
  afterEach(async () => {
    await AddressTest.deleteMany();
    await ContactTest.delete();
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  })

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).get(`/api/v1/contacts/${contact!.id}/addresses/${address.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.country).toBe("country");
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).get(`/api/v1/contacts/${contact!.id}/addresses/666`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).get(`/api/v1/contacts/666/addresses/${address!.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
})

describe("PATCH /contacts/:contactId/addresses/:addressId", () => {
  afterEach(async () => {
    await AddressTest.deleteMany();
    await ContactTest.delete();
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  })

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).patch(`/api/v1/contacts/${contact!.id}/addresses/${address!.id}`).set("X-API-TOKEN", "test").send({
      "street" : "street",
      "city" : "city",
      "province" : "province",
      "country" : "country",
      "postal_code" : "1234"
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.country).toBe("country");
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).patch(`/api/v1/contacts/${contact!.id}/addresses/${address!.id}`).set("X-API-TOKEN", "test").send({
      "street" : "",
      "city" : "city",
      "province" : "province",
      "country" : "country",
      "postal_code" : "1234"
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).patch(`/api/v1/contacts/${contact!.id}/addresses/${address!.id}`).set("X-API-TOKEN", "test").send({});

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.country).toBe("country");
  });

  it("", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web).patch(`/api/v1/contacts/${contact!.id}/addresses/666`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).patch(`/api/v1/contacts/666/addresses/${address!.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
})

describe("DELETE /contacts/:contactId/addresses/:addressId", () => {
  afterEach(async () => {
    await AddressTest.deleteMany();
    await ContactTest.delete();
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  })

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).delete(`/api/v1/contacts/${contact!.id}/addresses/${address!.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    await supertest(web).delete(`/api/v1/contacts/${contact!.id}/addresses/${address!.id}`).set("X-API-TOKEN", "test");
    const response = await supertest(web).get(`/api/v1/contacts/${contact!.id}/addresses/${address!.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const address = await AddressTest.get();
    const response = await supertest(web).get(`/api/v1/contacts/666/addresses/${address!.id}`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
})

describe("GET /contacts/:contactId/addresses", () => {
  afterEach(async () => {
    await AddressTest.deleteMany();
    await ContactTest.delete();
    await UserTest.delete();
  });

  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  })

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const response = await supertest(web).get(`/api/v1/contacts/${contact!.id}/addresses`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });
  
  it("", async () => {
    const response = await supertest(web).get(`/api/v1/contacts/666/addresses`).set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const response = await supertest(web).get(`/api/v1/contacts/${contact!.id}/addresses`).set("X-API-TOKEN", "test").query({
      page: 2,
      size: 1,
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });

  it("", async () => {
    const contact = await ContactTest.get();
    await AddressTest.create(contact!.id);
    const response = await supertest(web).get(`/api/v1/contacts/${contact!.id}/addresses`).set("X-API-TOKEN", "test").query({
      keyword: "adfasf",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });
})
