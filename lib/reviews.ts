import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export type Review = {
  body: string, 
  title: string, 
  image: string, 
  date: string,
  slug: string
}

export async function getReview(slug: string): Promise<Review> {
  //path is relative to the project folder - because project folder is the working dir when we run our app
  const file = `./content/reviews/${slug}.md`;
  const text = await readFile(file, "utf-8");
  const { content, data: {title, image, date} } = matter(text);
  const body = await marked(content);
  return { body, title, image, date, slug };
}

export async function getFeturedReview() {
  //path is relative to the project folder - because project folder is the working dir when we run our app
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReviews(): Promise<Review[]> {
  const reviews: Review[] = [];
  
  const slugs = await getSlugs();

  for(const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }

  //sort by most recent review desc
  reviews.sort( (a,b) => b.date.localeCompare(a.date));
  // reviews.sort( (a,b) => {
  //   if(a.date > b.date) return -1;
  //   if(a.date < b.date) return 1;
  //   return 0;
  // });

  return reviews;
}

export async function getSlugs() {
  const files = await readdir('./content/reviews/');

  return files
    .filter( item => item.endsWith('.md'))
    .map( item => item.split('.').slice(0, -1).join('.'));
}