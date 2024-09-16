import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export default function Heading({children}: Props) {

  return (
    <h1 className='text-2xl font-orbitron font-bold pb-3'>
      {children}
    </h1>
  )
}