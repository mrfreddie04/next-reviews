"use client";

import { PiSpinnerGap } from 'react-icons/pi';
import { useFormState } from "@/hooks/useFormState";
import { signUpAction } from "@/app/actions/authActions";
import Link from 'next/link';


export default function SignUpForm() {
  const { state, handleSubmit} = useFormState(signUpAction);

  return (
    <form onSubmit={handleSubmit}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
    >
      <div className="flex">
        <label htmlFor="emailField" className="shrink-0 w-32">
          Email
        </label>
        <input type="email" id="emailField" name="email" required maxLength={50}
          className="border px-2 py-1 rounded w-48" 
        />
      </div>
      <div className="flex">
        <label htmlFor="nameField" className="shrink-0 w-32">
          Name
        </label>
        <input type="text" id="nameField" name="name" required maxLength={50}
          className="border px-2 py-1 rounded w-48" 
        />
      </div>  
      <div className="flex">
        <label htmlFor="passwordField" className="shrink-0 w-32">
          Password
        </label>
        <input type="password" id="passwordField" name="password" required maxLength={50}
          className="border px-2 py-1 rounded w-48" 
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
      <p className="pb-1">
        Have an account already?&nbsp;
        Please <Link className="text-orange-800 hover:underline" href={"/sign-in"}>Sign In</Link> instead
      </p>
    </form>
  )
}
