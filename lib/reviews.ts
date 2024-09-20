import 'server-only';

import { marked } from "marked";
import qs from "qs";
//import { readFile, readdir } from "node:fs/promises";
//import matter from "gray-matter";

//const CMS_URL = "http://localhost:1337";
const CMS_URL = process.env.CMS_URL;
console.log("[CMS_URL]", CMS_URL);

export const CACHE_TAG_REVIEWS = "reviews";
export const PAGE_SIZE = 6;

export type Pagination = {
  pageSize?: number | null, 
  pageNumber?: number | null
}

export type Review = {
  body?: string, 
  title: string, 
  subtitle: string,
  image: string, 
  date: string,
  slug: string
}

export type SearchableReview = {
  slug: string,
  title: string
}

export type Reviews = {
  reviews: Review[],
  pageCount: number
}

export async function getReview(slug: string): Promise<Review|null> {
  const parameters = {
    fields: ['slug','title','subtitle','publishedAt','body'],
    filters: { slug: {$eq: slug}},
    populate: { image: { fields: ['url'] }},
    pagination: { pageSize: 1, withCount: false}, //set page size to 1, disable total count
  };
  const { data } = await fetchReviews(parameters);

  if(data.length === 0 ) return null;
  
  const item = data[0];

  return { 
    ...toReview(item),
    body: await marked(item.attributes.body),
  } as Review;
}

export async function getReviews({pageSize=PAGE_SIZE, pageNumber=1}: Pagination): Promise<Reviews> {
  //fetch from CMS Web API - http://localhost:1337/api/reviews
  //console.log("[getReviews] options:", { pageSize, pageNumber});
  const parameters = {
    fields: ['slug','title','subtitle','publishedAt'],
    populate: { image: { fields: ['url'] }},
    pagination: { pageSize: pageSize, page: pageNumber},
    sort: ['publishedAt:desc']
  }
  const { data, meta } = await fetchReviews(parameters);

  //console.log("[Pagination]", meta.pagination)

  return {
    reviews: data.map(toReview),
    pageCount: meta.pagination.pageCount
  };
}

export async function getSearchableReviews() {
  const parameters = { 
    fields: ['slug','title'],
    sort: ['title:asc'],
    pagination: { pageSize: 100 }
  };
  const { data } = await fetchReviews(parameters);
  return data.map( ({attributes}) => ({
    slug: attributes.slug, 
    title: attributes.title
  })) as SearchableReview[];
}

export async function searchReviews(query: string) {
  const parameters = { 
    fields: ['slug','title'],
    sort: ['title:asc'],
    filters: { title: {$containsi: query}}, //case-insensitive
    pagination: { pageSize: 5 }
  };
  const { data } = await fetchReviews(parameters);
  return data.map( ({attributes}) => ({
    slug: attributes.slug, 
    title: attributes.title
  })) as SearchableReview[];
}

export async function getSlugs() {
  const parameters = { 
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 }
  };
  const { data } = await fetchReviews(parameters);
  return data.map( (item) => item.attributes.slug) as string[];
}

async function fetchReviews(parameters:any) {
  const queryParams = qs.stringify(parameters,{encodeValuesOnly: true});
  const url = `${CMS_URL}/api/reviews?${queryParams}`;
  const response = await fetch(url, { 
    //cache: 'no-store',
    //next: {revalidate: 30}
    next: {tags: [CACHE_TAG_REVIEWS]}
  });

  if(!response.ok) {
    throw new Error(`CMS returned: ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item: any) {
  const {attributes} = item;

  const imageUrl = new URL(attributes.image.data.attributes.url, CMS_URL);

  return { 
    slug: attributes.slug, 
    title: attributes.title, 
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0,10), 
    //image: `${CMS_URL}${attributes.image.data.attributes.url}`, 
    image: imageUrl.href
  } as Review;
}

// export async function getFeaturedReview() {
//   //path is relative to the project folder - because project folder is the working dir when we run our app
//   const reviews = await getReviews(1);
//   return reviews[0];
// }

// export async function getSlugsOld() {
//   const files = await readdir('./content/reviews/');

//   return files
//     .filter( item => item.endsWith('.md'))
//     .map( item => item.split('.').slice(0, -1).join('.'));
// }

// export async function getReviewsOld(): Promise<Review[]> {
//   const reviews: Review[] = [];
  
//   const slugs = await getSlugs();

//   for(const slug of slugs) {
//     const review = await getReview(slug);
//     reviews.push(review);
//   }

//   //fetch from CMS app - http://localhost:1337/api/reviews
//   // const baseUrl = "http://localhost:1337";
//   // const response = await fetch(`${baseUrl}/api/reviews`);
//   // const data = await response.json();

//   //sort by most recent review desc
//   reviews.sort( (a,b) => b.date.localeCompare(a.date));
//   // reviews.sort( (a,b) => {
//   //   if(a.date > b.date) return -1;
//   //   if(a.date < b.date) return 1;
//   //   return 0;
//   // });

//   return reviews;
// }

// export async function getReviewOld(slug: string): Promise<Review> {
//   //path is relative to the project folder - because project folder is the working dir when we run our app
//   const file = `./content/reviews/${slug}.md`;
//   const text = await readFile(file, "utf-8");
//   const { content, data: {title, image, date} } = matter(text);
//   const body = await marked(content);
//   return { body, title, image, date, slug };
// }