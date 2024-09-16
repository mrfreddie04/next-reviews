import type { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export default function ReviewsLayout({children}: Props) {
  return (
    <div style={{display: "flex"}}>
      <div style={{border: "solid red 1px", borderRadius: "5px"}}>
        [Reviews Menu SideBar]
      </div>
      <div>
        {children}
      </div>
    </div>
  );  
}