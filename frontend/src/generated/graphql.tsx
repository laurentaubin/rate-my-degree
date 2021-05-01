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
  courses: Array<Course>;
  course: Course;
  me: User;
};


export type QueryCoursesArgs = {
  limit?: Maybe<Scalars['Float']>;
  filters: Scalars['String'];
};


export type QueryCourseArgs = {
  data: CourseInput;
};

export type Course = {
  __typename?: 'Course';
  initials: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  professor: Scalars['String'];
  comments: Array<CourseComment>;
};


export type CourseCommentsArgs = {
  order?: Maybe<Scalars['String']>;
  attribute?: Maybe<Scalars['String']>;
};

export type CourseComment = {
  __typename?: 'CourseComment';
  id: Scalars['String'];
  subComments?: Maybe<Array<CourseComment>>;
  content: Scalars['String'];
  score: Scalars['Float'];
  createdAt: Scalars['String'];
};

export type CourseInput = {
  initials: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  pictureUrl: Scalars['String'];
  comments: Array<CourseComment>;
  createdAt: Scalars['String'];
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

export type CourseQueryVariables = Exact<{
  initials: Scalars['String'];
  order: Scalars['String'];
  attribute: Scalars['String'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course: (
    { __typename?: 'Course' }
    & Pick<Course, 'title' | 'initials' | 'professor' | 'description'>
    & { comments: Array<(
      { __typename?: 'CourseComment' }
      & CommentFieldsFragment
      & SubCommentsFragment
    )> }
  ) }
);

export type SubCommentsFragment = (
  { __typename?: 'CourseComment' }
  & { subComments?: Maybe<Array<(
    { __typename?: 'CourseComment' }
    & { subComments?: Maybe<Array<(
      { __typename?: 'CourseComment' }
      & { subComments?: Maybe<Array<(
        { __typename?: 'CourseComment' }
        & { subComments?: Maybe<Array<(
          { __typename?: 'CourseComment' }
          & { subComments?: Maybe<Array<(
            { __typename?: 'CourseComment' }
            & CommentFieldsFragment
          )>> }
          & CommentFieldsFragment
        )>> }
        & CommentFieldsFragment
      )>> }
      & CommentFieldsFragment
    )>> }
    & CommentFieldsFragment
  )>> }
  & CommentFieldsFragment
);

export type CommentFieldsFragment = (
  { __typename?: 'CourseComment' }
  & Pick<CourseComment, 'id' | 'content' | 'score' | 'createdAt'>
);

export type CoursesQueryVariables = Exact<{
  filter: Scalars['String'];
  limit?: Maybe<Scalars['Float']>;
}>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'initials' | 'title' | 'professor'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'name'>
  ) }
);

export const CommentFieldsFragmentDoc = gql`
    fragment CommentFields on CourseComment {
  id
  content
  score
  createdAt
}
    `;
export const SubCommentsFragmentDoc = gql`
    fragment SubComments on CourseComment {
  ...CommentFields
  subComments {
    ...CommentFields
    subComments {
      ...CommentFields
      subComments {
        ...CommentFields
        subComments {
          ...CommentFields
          subComments {
            ...CommentFields
          }
        }
      }
    }
  }
}
    ${CommentFieldsFragmentDoc}`;
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
export const CourseDocument = gql`
    query Course($initials: String!, $order: String!, $attribute: String!) {
  course(data: {initials: $initials}) {
    title
    initials
    professor
    description
    comments(order: $order, attribute: $attribute) {
      ...CommentFields
      ...SubComments
    }
  }
}
    ${CommentFieldsFragmentDoc}
${SubCommentsFragmentDoc}`;

export function useCourseQuery(options: Omit<Urql.UseQueryArgs<CourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseQuery>({ query: CourseDocument, ...options });
};
export const CoursesDocument = gql`
    query Courses($filter: String!, $limit: Float) {
  courses(filters: $filter, limit: $limit) {
    initials
    title
    professor
  }
}
    `;

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    name
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};