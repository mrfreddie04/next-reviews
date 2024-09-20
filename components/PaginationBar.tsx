import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";

type Props = {
  page: number,
  pageCount: number,
  href: string
}

export default function PaginationBar({page, pageCount, href}: Props) {
  return (
    <div className="flex items-center gap-2">
      <PaginationLink href={`${href}?page=${page > 1 ? page -1 : 1}`} enabled={page > 1}>
        <ChevronLeftIcon className="w-5 h5"/>
        <span className="sr-only">Previous Page</span>
      </PaginationLink>
      <span>Page {page} of {pageCount}</span>
      <PaginationLink href={`${href}?page=${page < pageCount ? page + 1: pageCount}`} enabled={page < pageCount }>
        <ChevronRightIcon className="w-5 h5"/>
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  )
}

type PaginationLinkProps = {
  href: string,
  enabled: boolean,
  children: ReactNode
}

function PaginationLink({href,enabled,children}: PaginationLinkProps) {
  if(!enabled) {
    return (
      <span className="border px-2 py-1 rounded cursor-not-allowed text-slate-300 text-sm">
        {children}
      </span>
    ); 
  }
  return (
    <Link href={href} className="border px-2 py-1 rounded hover:bg-orange-100 text-slate-500 hover:text-slate-700 text-sm">
      {children}
    </Link>
  );
}
