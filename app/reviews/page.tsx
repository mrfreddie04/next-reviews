import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Reviews',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-row flex-wrap gap-3">
        { reviews.map( review => (
          <li 
            key={review.slug}
            className="border w-80 bg-white rounded shadow hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <img 
                src={review.image} 
                alt="Game poster"
                width={320} 
                height={180}
                className="rounded-t"
              />	
              <h2 className="font-orbitron text-center font-semibold py-1">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}  
      </ul>
    </>
  )
}