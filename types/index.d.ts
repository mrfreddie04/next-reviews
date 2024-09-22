import { Prisma } from "@prisma/client";

type CommentCreateDto = {
  userId: string,
  slug: string,
  message: string
}

type CommentDto = {
  id: string,
  userName: string,
  slug: string,
  message: string
}

type CommentWithSender = Prisma.CommentGetPayload<{
  select: {
    id: true, 
    message: true,
    slug: true,
    user: { select: { name: true }}
  }
}>;


type SignInDto = {
  email: string,
  password: string
}

type UserDto = {
  id: string,
  email: string,
  name: string
}

type UserCreateDto = {
  email: string,
  password: string,
  name: string
}


type Pagination = {
  pageSize?: number | null, 
  pageNumber?: number | null
}

type Review = {
  body?: string, 
  title: string, 
  subtitle: string,
  image: string, 
  date: string,
  slug: string
}

type SearchableReview = {
  slug: string,
  title: string
}

type Reviews = {
  reviews: Review[],
  pageCount: number
}

type ActionResult = {
  isError: boolean, 
  message: string | null
} | null;

type FormState = {
  error: string | null,
  loading: boolean
}

// type ActionResult<T> =   
//   { status: 'success', data: T } | 
//   { status: 'error', error: string }