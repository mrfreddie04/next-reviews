"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setClicked(true);
        setTimeout(() => {
          setClicked(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // setClicked(true);
    // setTimeout(() => {
    //   setClicked(false);
    // }, 1500);
  }

  console.log("[ShareLinkButton] clicked:", clicked);

  return (
    <button 
      onClick={handleClick}
      className="border flex flex-row gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
    > 
      <LinkIcon className="h-4 w-4 "/>
      { clicked ? "Link Copied" :"Share Link" }
    </button>
  )
}