//import { PowerIcon } from "@heroicons/react/20/solid";
import { signOutAction } from "@/app/actions/authActions";

export default function SignOutButton() {

  return (
    <form action={signOutAction}>
      <button 
        type="submit"
        className="text-orange-800 hover:underline"
      > 
        Sign Out
      </button>
    </form>
  )
}

{/* <button 
type="submit"
className="border flex flex-row gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
> 
<PowerIcon className="h-4 w-4 "/>
Sign Out
</button> */}