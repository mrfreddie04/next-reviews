import { Suspense, lazy } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from 'next/navigation';
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { getReview, getSlugs } from "@/lib/reviews";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import CommentListSkeleton from "@/components/CommentListSkeleton";
import { getUserFromSession } from "@/lib/auth";
import Link from "next/link";
//import { delay } from "@/lib/utils";

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
  const user = await getUserFromSession();

  console.log("[ReviewPage] rendering", slug);

  //await delay(1000);

  //const CommentListLazy = lazy(() => import("@/components/CommentList"));

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
      <section className="border-dashed border-t max-w-screen-sm mt-3 py-3">
        <h2 className="font-bold flex gap-2 items-center text-xl">
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6"/>
          Comments
        </h2>
        {user ? (
          <CommentForm userName={user.name} title={review.title} slug={review.slug}/>
        ) : (
          <div className="border bg-white mt-3 py-3 px-3 rounded">
            Please <Link className="text-orange-800 hover:underline" href={"/sign-in"}>Sign In</Link> to have your say!
          </div>
        )}
        <Suspense fallback={<CommentListSkeleton/>}>
          <CommentList slug={review.slug}/>
        </Suspense>
      </section>
    </>
  )
}