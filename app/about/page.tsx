import type { Metadata } from "next";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <Heading>About Indie Gamer</Heading>
      <p>
      We are a small yet powerful group of visionaries, idealists, and innovators.
      </p>
    </>
  )
}