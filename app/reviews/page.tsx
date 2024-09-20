import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";
import { PAGE_SIZE, getReviews, getSearchableReviews } from "@/lib/reviews";
import type { Metadata } from "next";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

//export const dynamic = 'force-dynamic';
//export const revalidate = 30;
type Props = {
  searchParams: {
    page: string
  }
}

export const metadata: Metadata = {
  title: 'Reviews',
};

export default async function ReviewsPage({searchParams}: Props) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews({pageSize: PAGE_SIZE,pageNumber: page});
  //const searchableReviews = await getSearchableReviews();
  //console.log('[ReviewsPage] reviews:',reviews.map( review => review.slug).join(", "));
  console.log('[ReviewsPage] rendering:', page);
  //console.log('[ReviewsPage] reviews:', reviews);

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar page={page} pageCount={pageCount} href='/reviews'/>
        {/* <SearchBox reviews={searchableReviews}/> */}
        <SearchBox />
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        { reviews.map( (review, index) => (
          <li 
            key={review.slug}
            className="border w-80 bg-white rounded shadow hover:shadow-xl">
            <Link href={`/reviews/${review.slug}`}>
              <Image 
                src={review.image} 
                alt="Game poster"
                width={320} 
                height={180}
                className="rounded-t"
                priority={index===0}
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

function parsePageParam(paramValue: string): number {
  if(paramValue) {
    const page = parseInt(paramValue);
    if(isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}