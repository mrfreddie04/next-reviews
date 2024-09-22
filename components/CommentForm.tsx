"use client";

import { PiSpinnerGap } from 'react-icons/pi';
import { createCommentAction } from "@/app/actions/commentActions";
import { useFormState } from "@/hooks/useFormState";

type Props = {
  title: string,
  slug: string,
  userName: string
}

export default function CommentForm({slug, title, userName}: Props) {
  const { state, handleSubmit} = useFormState(createCommentAction);

  return (
    <form onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <span>{userName}</span>
        {/* <input id="userField" name="user" value={name} readOnly
          className="border px-2 py-1 rounded w-48" 
        /> */}
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea id="messageField" name="message" required maxLength={500}
          className="border px-2 py-1 rounded w-full" 
        />
      </div>
      {!!state.error && (<p className='text-red-500 text-sm'>{state.error}</p>)}
      <button type="submit"
        disabled={state.loading}
        className="flex flex-row gap-2 justify-center bg-orange-800 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-orange-700 
                   disabled:bg-slate-500 disabled:cursor-not-allowed" 
      >
        {state.loading && (<PiSpinnerGap size={24} className='fill-white animate-spin'/>)} 
        <span>Submit</span>
      </button>
    </form>
  )

  //required maxLength={500}
}

//<PiSpinnerGap size={32} className='fill-white animate-spin'/>