import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

//export const dynamic = 'force-dynamic';
//export const revalidate = 30;

export default async function HomePage() {
  const { reviews } = await getReviews({pageSize:3, pageNumber:1});

  console.log("[HomePage] rendering",
    reviews.map( review => review.slug).join(", ")
  );

  return (
    <>
      <Heading>Welcome to Indie Gamer</Heading>
      <p className="pb-3">
        Only the best indie games, reviewed for you.
      </p>
      <ul className="flex flex-col gap-3">
        {reviews.map( (review, index) => (
          <li 
            key={review.slug}
            className="border w-80 sm:w-full bg-white rounded shadow hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image 
                src={review.image} 
                alt="Game poster"
                width={320} 
                height={180}
                className="rounded-t sm:rounded-l sm:rounded-r-none"
                priority={index === 0}
              />	
              <div className="py-1 px-2 text-center sm:text-left">
                <h2 className="font-orbitron font-semibold ">
                  {review.title}
                </h2>
                <p className="hidden sm:block pt-2 font-orbitron text-xs">
                  {review.subtitle}
                </p>
              </div>
            </Link>
          </li> 
        ))}
      </ul>
    </>
  );  
}