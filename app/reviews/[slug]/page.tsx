import Heading from "@/components/Heading";
//import ShareButtons from "@/components/ShareButtons";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getSlugs(); 
  return slugs.map( slug => ({slug}));
}

export async function generateMetadata({params: { slug }}: Props) {
  const review = await getReview(slug);
  return  {
    title: review.title
  } as Metadata;
}

export default async function ReviewPage({params: { slug }}: Props) {
  const review = await getReview(slug);

  console.log("[ReviewPage] rendering", slug);

  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex flex-row gap-3 mb-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <img 
        src={review.image}
        alt="Game poster"
        width={640} 
        height={360}
        className="rounded mb-2"
      />
      <article dangerouslySetInnerHTML={{__html:review.body}}
        className='prose prose-slate max-w-screen-sm'
      />
    </>
  )
}