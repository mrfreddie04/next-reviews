import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeturedReview } from "@/lib/reviews";

export default async function HomePage() {
  const review = await getFeturedReview();

  console.log("[HomePage] rendering");

  return (
    <>
      <Heading>Welcome to Indie Gamer</Heading>
      <p className="pb-3">
        Only the best indie games, reviewed for you.
      </p>
      <div className="border w-80 sm:w-full bg-white rounded shadow hover:shadow-xl ">
        <Link href={`/reviews/${review.slug}`}
          className="flex flex-col sm:flex-row"
        >
          <img 
            src={review.image} 
            alt="Game poster"
            width={320} 
            height={180}
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />	
          <h2 className="font-orbitron text-center font-semibold py-1 sm:px-2">
            {review.title}
          </h2>
        </Link>
      </div>   
    </>
  );  
}