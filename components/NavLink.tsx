"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string,
  prefetch: boolean,
  children: ReactNode
}

export default function NavLink({href, prefetch, children}: Props) {
  const pathname = usePathname();
  const enabled = href !== pathname;
  
  if(!enabled) {
    return (
      <span className="text-orange-800">
        {children}
      </span>
    )
  }
  return (
    <Link href={href} prefetch={prefetch}
      className="text-orange-800 hover:underline">
      {children}
    </Link>
  )
}