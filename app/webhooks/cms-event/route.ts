import { revalidateTag } from "next/cache";
import { CACHE_TAG_REVIEWS } from "@/lib/reviews";

export async function POST(req: Request) {
  const payload = await req.json();
  if(payload.model === "review") {
    revalidateTag(CACHE_TAG_REVIEWS);
  }
  console.log('revlidated:', CACHE_TAG_REVIEWS);
  return new Response(null, {status: 204});
}