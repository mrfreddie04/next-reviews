import { hash,compare } from "bcrypt";
import { db } from "@/lib/db";
import type { User } from "@/lib/db";
import { UserCreateDto } from "@/types";

export async function createUser(user: UserCreateDto): Promise<User> {
  //hash password
  const passwordHash = await hash(user.password, 10);
  return await db.user.create({
    data: {
      email: user.email,
      name: user.name,
      passwordHash: passwordHash
    }
  });
}

export async function getUserByEmail(email: string): Promise<User> {
  //await delay(3000);
  return await db.user.findUnique({
    where: { email },
  });
}

export async function authenticate(email: string, password: string): Promise<User|null> {
  //get user
  const user = await db.user.findUnique({
    where: { email },
  });
  if(!user) return null;

  //verify password
  if(!await compare(password, user.passwordHash)) return null;

  return user;
}