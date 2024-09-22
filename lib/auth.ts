import { cache } from "react";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { UserDto } from "@/types";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_KEY);
const JWT_COOKIE = 'sessionToken';
const JWT_DURATION = 14 * 24 * 60 * 60 * 1000; //in ms

export function deleteUserSession() {
  cookies().delete(JWT_COOKIE);
}

export const decodeSessionToken = cache( async (sessionToken: string) => {
  try {
    console.log("calling jwtVerify");
    const decodedToken = await jwtVerify(sessionToken, JWT_SECRET);
    return decodedToken.payload as UserDto;
  } catch(e) {
    console.warn("[Invalid JWT]:",e)
    // if(e.name === "JWSSignatureVerificationFailed") return null;
  }
});

export function getUserFromSession() {
  const sessionTokenCookie = cookies().get(JWT_COOKIE);
  const sessionToken = sessionTokenCookie?.value;
  if(sessionToken) {
    return decodeSessionToken(sessionToken);
  }
}

export async function createUserSession(user: UserDto) {
  const {id, email, name} = user;
  const expirationTime = new Date(Date.now() + JWT_DURATION)
  //generate JWT
  const sessionToken = await new SignJWT({id, email, name})
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime(expirationTime)
    .sign(JWT_SECRET);

  //set response cookie
  cookies().set(JWT_COOKIE, sessionToken, {
    expires: expirationTime,
    httpOnly: true,
    sameSite: 'strict'
  });
}