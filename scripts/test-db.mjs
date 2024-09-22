import { PrismaClient } from "@prisma/client";
const db = new PrismaClient({
  log: [{ 
    emit: 'stdout', 
    level: 'query'
  }]
});

const comment = await db.comment.create({
  data: {
    user: "Script",
    slug: "fall-guys",
    message: "Comment added via node.sj script"
  }
});

console.log("Created:", comment);

// const comments = await db.comment.findMany({
//   where: { slug: 'fall-guys'}
// });
// console.log("Selected:", comments);

// const commentDb = await db.comment.findFirst({
//   where: { slug: "stardew-valley" }
// })

// console.log("CommentDb:", commentDb);