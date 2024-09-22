import type { Metadata } from "next";
import Heading from "@/components/Heading";
import SignUpForm from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: 'Register',
};

export default function page() {
  return (
    <>
      <Heading>Register</Heading>
      <SignUpForm/>
    </>
  )
}