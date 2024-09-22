import type { Metadata } from "next";
import Heading from "@/components/Heading";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: 'Sign in',
};

export default function page() {
  return (
    <>
      <Heading>Sign in</Heading>
      <SignInForm/>
    </>
  )
}