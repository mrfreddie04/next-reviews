import { NextRequest, NextResponse } from "next/server";
import { searchReviews } from "@/lib/reviews";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query');
  //console.log("Search:", query);
  const reviews = query && query.length > 1 && await searchReviews(query) || [];
  return NextResponse.json(reviews);
}