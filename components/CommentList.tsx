import { getComments } from "@/lib/comments";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// const comments: Comment[] = [
//   { id: '1', user:'Alice', message: 'Love this game!'},
//   { id: '2', user:'Bob', message: 'Ok, but not really my genre'},
//   { id: '3', user:'Charlie', message: 'I am addicted. Can\'t stop playing it'},
// ]

type Props = {
  slug: string
}

export default async function CommentList({slug}: Props) {
  const comments = await getComments(slug);

  if(comments.length === 0) {
    return (
      <p className="italic mt-3">There are no comments yet for this game</p>
    )
  }

  return (
    <ul className="border rounded mt-3">
      {comments.map( comment => (
        <li key={comment.id}
          className="border-b px-3 py-2 last:border-none odd:bg-orange-100"
        >
          <div className="flex gap-3 text-slate-500">
            <UserCircleIcon className="w-6 h-6"/>
            {comment.userName}
          </div>
          <p className="italic">{comment.message}</p>
        </li>
      ))}
    </ul>
  )
}