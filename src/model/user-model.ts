import { User } from "@prisma/client";

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
}

export type CreateUserRequest = {
  name: string;
  username: string;
  password: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    username: user.username,
  }
}
