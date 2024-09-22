"use server";

import { createUserSession, deleteUserSession } from "@/lib/auth";
import { authenticate, createUser, getUserByEmail } from "@/lib/users";
import { ActionResult, UserCreateDto } from "@/types";
import { redirect } from "next/navigation";

export async function signOutAction() {
  deleteUserSession();
  //redirect("/");
}

export async function signInAction( formData: FormData): Promise<ActionResult> {
  console.log("[signInAction] data:", Object.fromEntries(formData.entries()));
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await authenticate(email, password);
  if(!user) {
    return {isError: true, message: "Invalid credentials"};
  }

  await createUserSession(user);
  
  redirect("/");
}

export async function signUpAction( formData: FormData): Promise<ActionResult> {
  console.log("[signUpAction] data:", Object.fromEntries(formData.entries()));
  
  const data: UserCreateDto = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
  }

  //validate here - TODO

  //check if the user exists
  const userInDb = await getUserByEmail(data.email);
  if(userInDb) {
    return {isError: true, message: "User with this email already exists"};
  }

  const user = await createUser(data);
  if(!user) {
    return {isError: true, message: "Something went wrong"};
  }

  //send an email to complete the registration process

  await createUserSession(user);
  
  redirect("/");
}

