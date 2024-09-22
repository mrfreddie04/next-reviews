import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function CommentListSkeleton() {
  return (
    <ul className="border rounded mt-3 animate-pulse">
      {[1,2,3].map( index => (
        <li key={index}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 items-center text-slate-300">
            <UserCircleIcon className="w-6 h-6"/>
            <div className="bg-slate-300 rounded h-3 w-24"/>
          </div>
          <div className="py-1">
            <div className="bg-slate-300 rounded h-3 w-2/3"/>
          </div>
        </li>
      ))}
    </ul>
  )
}