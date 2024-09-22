import NavLink from "./NavLink";
import { getUserFromSession } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

export default async function NavBar() {

  const user = await getUserFromSession();

  return (
    <nav>
      <ul className="flex items-center justify-start gap-2">
        <li className="font-bold font-orbitron">
          <NavLink href={"/"} prefetch={true}>
            Indie Gamer
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href={"/reviews"} prefetch={true}>
            Reviews
          </NavLink>  
        </li>
        <li>
          <NavLink href={"/about"} prefetch={false}>
            About
          </NavLink>  
        </li>
        {user ? (
          <li>
            <SignOutButton/>
          </li>
        ): (
          <li>
            <NavLink href={"/sign-in"} prefetch={false}>
              Sign in
            </NavLink>  
          </li>
        )}
      </ul>
    </nav>
  )
}

