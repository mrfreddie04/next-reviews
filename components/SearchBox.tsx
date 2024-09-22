"use client";

import { useEffect, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useIsClient } from "@/hooks/useIsClient";

type Props = {
  reviews: SearchableReview[]
}

export default function SearchBox(/*{reviews}: Props*/) {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState<SearchableReview[]>([]);
  const router = useRouter();
  const isClient = useIsClient();
  const [debouncedQuery] = useDebounce(query, 400); 

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        try {
          const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
          const response = await fetch(url, { signal: controller.signal });
          if(response.ok) {
            const reviews = await response.json();
            setReviews(reviews);
          }
        } catch(e) {
          //console.log("AbortError",e)
          if (e.name === 'AbortError') {
            // expected: request cancelled
          } else {
            throw e;
          }  
        }
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  // useEffect(() => {
  //   console.log("useEffect", query)
  //   if(query && query.length > 1) {
  //     const controller = new AbortController();
  //     (async () => {
  //       //const reviews = await searchReviews(query);
  //       const url = `/api/search?query=${encodeURIComponent(query)}`;
  //       const response = await fetch(url, { signal: controller.signal});
  //       if(response.ok) {
  //         const reviews = await response.json();
  //         setReviews(reviews);
  //       }
  //     })();
  //     //cleanup function
  //     return () => {
  //       try {
  //         controller.abort();
  //       } catch(e) {
  //         console.log("AbortError",e)
  //       }
  //     }
  //   } else {
  //     setReviews([]);
  //   }
  // },[query]);
  
  const test_reviews: SearchableReview[] = [
    { slug: 'subnautica',title: 'Subnautica',},
    { slug: 'hades-2018',title: 'Hades',},
    { slug: 'fall-guys',title: 'Fall Guys: Ultimate Knockout bla bla bla'},
    { slug: 'black-mesa',title: 'Black Mesa'},
    { slug: 'disco-elysium',title: 'Disco Elysium',},
    { slug: 'dead-cells',title: 'Dead Cells',}
  ];

  const handleChange = (review: SearchableReview) => {
    console.log("[SearchBox] selected:", review);
    if(review) router.push(`/reviews/${review.slug}`);
  }

  //console.log("[SearchBox] isClient:", isClient);
  //console.log("[SearchBox] query:", query);

  if(!isClient) return null;

  // const filtered = reviews.filter( review => 
  //   review.title.toLowerCase().includes(query.toLowerCase()) || !query
  // ).slice(0, 5);

  return (
    <div className="w-48">
      <Combobox onChange={handleChange}>   
        <ComboboxInput placeholder="Search…"
          value={query}
          onChange={e=>setQuery(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <ComboboxOptions 
          anchor="bottom"
          transition
          className="bg-white py-1 w-[var(--input-width)]"
        >
          {reviews.map( (review) =>(
            <ComboboxOption key={review.slug} value={review}>
              {({focus, selected}) => (
                <span className={`block px-2 truncate w-full ${focus ? "bg-orange-100" :""}`}>
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}