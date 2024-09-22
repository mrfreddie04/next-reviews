import { db } from "@/lib/db";
import type { Comment } from "@/lib/db";
import { CommentCreateDto, CommentDto, CommentWithSender } from "@/types";
//import { delay } from "./utils";

export async function getComments(slug: string): Promise<CommentDto[]> {
  //await delay(3000);
  const comments = await db.comment.findMany({
    where: { slug: slug },
    select: { 
      id: true, 
      message: true,
      slug: true,
      user: { select: { name: true }}
    },
    orderBy: { postedAt: 'desc' },
  });

  return comments.map((comment) => mapCommentToCommentDto(comment));
}

export async function createComment(comment: CommentCreateDto): Promise<Comment> {
  
  return await db.comment.create({
    data: {
      userId: comment.userId,
      slug: comment.slug,
      message: comment.message
    }
  });
}

function mapCommentToCommentDto(comment: CommentWithSender ): CommentDto {
  return  {
    id: comment.id, 
    message: comment.message, 
    slug: comment.slug,
    userName: comment.user.name
  }
}