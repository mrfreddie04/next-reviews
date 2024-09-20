import { writeFileSync } from "node:fs";
import qs from "qs";
  
const file = "./scripts/strapi-response-reviews.json";

const baseUrl = "http://localhost:1337";
const queryParams = qs.stringify({
  fields: ['slug','title','subtitle','publishedAt'],
  populate: { image: { fields: ['url'] }},
  pagination: { pageSize: 6, page: 1},
  sort: ['publishedAt:desc']
},{encodeValuesOnly: true});
const url = `${baseUrl}/api/reviews?${queryParams}`;

console.log(url);

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
//console.log(formatted);

//write the response to a file
writeFileSync(file, formatted, "utf-8");
