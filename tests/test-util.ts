import { User } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async delete(){
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      }
    });
  }

  static async create(){
    await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      }
    });
  }

  static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test"
            }
        })

        if (!user) {
            throw new Error("User is not found");
        }

        return user;
    }
}

export class ContactTest {
  static async delete(){
    await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      }
    });
  }

  static async create(){
    await prismaClient.contact.create({
      data: {
        username: "test",
        first_name: "user",
        last_name: "user",
        email: "user@example.com",
        phone: "666",
      }
    });
  }

  static async get(){
    const contact = await prismaClient.contact.findFirst({
      where: {
        first_name: "user",
      }
    });
    return contact;
  }
}

export class AddressTest {

  static async create(contactId: number){
    await prismaClient.address.create({
      data: {
        "street": "street",
        "city": "city",
        "province": "province",
        "country": "country",
        "postal_code": "1234",
        "contact_id": contactId,
      }
    });
  }

  static async deleteMany(){
    await prismaClient.address.deleteMany({
      where: {
        country: "country",
      }
    });
  }

  static async get(){
    const address = await prismaClient.address.findFirst({
      where: {
        country: "country",
      }
    });
    return address;
  }
}
