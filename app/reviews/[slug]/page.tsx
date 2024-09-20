import Image from "next/image";
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";

type Props = {
  params: {
    slug: string
  }
}

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

//by default it is set to true, so we do not need to explicitly define it
//export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getSlugs(); 
  //console.log('[ReviewPage] slugs:', slugs);
  return slugs.map( slug => ({slug}));
}

export async function generateMetadata({params: { slug }}: Props) {
  const review = await getReview(slug);
  if(!review) {
    notFound(); //it stops the rendering process
  }
  return  {
    title: review?.title 
  } as Metadata;
}

export default async function ReviewPage({params: { slug }}: Props) {
  const review = await getReview(slug);

  console.log("[ReviewPage] rendering", slug);

  if(!review) {
    notFound();
  }

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">
        {review.subtitle}
      </p>
      <div className="flex flex-row gap-3 mb-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image 
        src={review.image}
        alt="Game poster"
        width={640} 
        height={360}
        className="rounded mb-2"
        priority
      />
      <article dangerouslySetInnerHTML={{__html:review.body}}
        className='prose prose-slate max-w-screen-sm'
      />
    </>
  )
}