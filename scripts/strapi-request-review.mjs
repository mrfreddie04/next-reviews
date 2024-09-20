import { writeFileSync } from "node:fs";
import qs from "qs";
import { marked } from "marked";
  
const file = "./scripts/strapi-response-review.json";

const CMS_URL = "http://localhost:1337";
const queryParams = qs.stringify({
  fields: ['slug','title','subtitle','publishedAt','body'],
  //filter by slug
  filters: { slug: {$eq: 'fall-guys'}},
  populate: { image: { fields: ['url'] }},
  //set page size to M_PLUS_1, disable total count
  pagination: { pageSize: 1, withCount: false},
},{encodeValuesOnly: true});
const url = `${CMS_URL}/api/reviews?${queryParams}`;

console.log(url);

const response = await fetch(url);
const { data } = await response.json();

const {attributes, id} = data[0];

const review = { 
  id: id,
  slug: attributes.slug, 
  title: attributes.title, 
  date: attributes.publishedAt.slice(0,10), 
  body: await marked(attributes.body),
  image: `${CMS_URL}${attributes.image.data.attributes.url}`, 
};

const formatted = JSON.stringify(review, null, 2);
//console.log(formatted);

//write the response to a file
writeFileSync(file, formatted, "utf-8");
