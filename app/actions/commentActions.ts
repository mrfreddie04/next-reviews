"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createComment } from "@/lib/comments";
import { getUserFromSession } from "@/lib/auth";
import { ActionResult, CommentCreateDto } from "@/types";

export async function createCommentAction( formData: FormData): Promise<ActionResult> {
  const user = await getUserFromSession();
  if(!user) {
    //throw an error instead of displaying an error message - because that should not happen, unless sb is trying to hack the app
    throw new Error("Unauthorized");
  }

  const data: CommentCreateDto = { 
    userId: user.id,
    slug: formData.get("slug") as string, 
    message: formData.get("message") as string
  };

  console.log("[createCommentAction] data:", data);

  const error = validate(data);
  if(error) {
    return {isError: true, message: error};
  }

  const comment = await createComment(data);
  console.log('created:', comment);

  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`); //redirect to the same route, to update the page
}

function validate(data: CommentCreateDto): string | null | undefined {
  if (!data.message) {
    return 'Comment field is required';
  }
  if (data.message.length > 500) {
    return 'Comment field cannot be longer than 500 characters';
  }
}