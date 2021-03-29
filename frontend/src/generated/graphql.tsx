import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  comment: CourseComment;
  courses: Array<Course>;
  course: Course;
};


export type QueryCommentArgs = {
  id: Scalars['String'];
};


export type QueryCourseArgs = {
  data: CourseInput;
};

export type CourseComment = {
  __typename?: 'CourseComment';
  id: Scalars['String'];
  subComments?: Maybe<Array<CourseComment>>;
  isSubComment: Scalars['Boolean'];
  content: Scalars['String'];
  score: Scalars['Float'];
  createdAt: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  initials: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  professor: Scalars['String'];
  comments: Array<CourseComment>;
};

export type CourseInput = {
  initials: Scalars['String'];
  sortBy: SortBy;
};

export type SortBy = {
  attribute: Scalars['String'];
  order: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: CourseComment;
  createCourse: Course;
  addComment: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  data: VoteInput;
};


export type MutationCreateCourseArgs = {
  data: CreateCourseInput;
};


export type MutationAddCommentArgs = {
  data: AddCommentInput;
};

export type VoteInput = {
  commentId: Scalars['String'];
  score: Scalars['Float'];
};

export type CreateCourseInput = {
  initials: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  professor: Scalars['String'];
};

export type AddCommentInput = {
  courseInitials: Scalars['String'];
  content: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
};

export type AddCommentMutationVariables = Exact<{
  courseInitials: Scalars['String'];
  content: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addComment'>
);

export type CreateCourseMutationVariables = Exact<{
  initials: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  professor: Scalars['String'];
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse: (
    { __typename?: 'Course' }
    & Pick<Course, 'initials' | 'title' | 'description' | 'professor'>
  ) }
);

export type VoteMutationVariables = Exact<{
  score: Scalars['Float'];
  commentId: Scalars['String'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'CourseComment' }
    & Pick<CourseComment, 'id' | 'score'>
  ) }
);

export type CommentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CommentQuery = (
  { __typename?: 'Query' }
  & { comment: (
    { __typename?: 'CourseComment' }
    & Pick<CourseComment, 'id' | 'content' | 'createdAt' | 'score'>
    & { subComments?: Maybe<Array<(
      { __typename?: 'CourseComment' }
      & Pick<CourseComment, 'id'>
    )>> }
  ) }
);

export type CourseQueryVariables = Exact<{
  initials: Scalars['String'];
  attribute: Scalars['String'];
  order: Scalars['String'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course: (
    { __typename?: 'Course' }
    & Pick<Course, 'initials' | 'title' | 'description' | 'professor'>
    & { comments: Array<(
      { __typename?: 'CourseComment' }
      & Pick<CourseComment, 'id' | 'isSubComment'>
    )> }
  ) }
);

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'initials' | 'title' | 'description' | 'professor'>
  )> }
);


export const AddCommentDocument = gql`
    mutation AddComment($courseInitials: String!, $content: String!, $parentId: String) {
  addComment(
    data: {courseInitials: $courseInitials, content: $content, parentId: $parentId}
  )
}
    `;

export function useAddCommentMutation() {
  return Urql.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument);
};
export const CreateCourseDocument = gql`
    mutation CreateCourse($initials: String!, $title: String!, $description: String!, $professor: String!) {
  createCourse(
    data: {initials: $initials, title: $title, description: $description, professor: $professor}
  ) {
    initials
    title
    description
    professor
  }
}
    `;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const VoteDocument = gql`
    mutation Vote($score: Float!, $commentId: String!) {
  vote(data: {score: $score, commentId: $commentId}) {
    id
    score
  }
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const CommentDocument = gql`
    query Comment($id: String!) {
  comment(id: $id) {
    id
    content
    createdAt
    score
    subComments {
      id
    }
  }
}
    `;

export function useCommentQuery(options: Omit<Urql.UseQueryArgs<CommentQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CommentQuery>({ query: CommentDocument, ...options });
};
export const CourseDocument = gql`
    query Course($initials: String!, $attribute: String!, $order: String!) {
  course(
    data: {initials: $initials, sortBy: {attribute: $attribute, order: $order}}
  ) {
    initials
    title
    description
    professor
    comments {
      id
      isSubComment
    }
  }
}
    `;

export function useCourseQuery(options: Omit<Urql.UseQueryArgs<CourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseQuery>({ query: CourseDocument, ...options });
};
export const CoursesDocument = gql`
    query Courses {
  courses {
    initials
    title
    description
    professor
  }
}
    `;

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
};