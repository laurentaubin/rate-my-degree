import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { Comment } from "@components/comment/Comment";
import { ReplySection } from "@components/comment/ReplySection";
import { Layout } from "@components/Layout";
import { SortingBar } from "@components/SortingBar";
import { useAddCommentMutation, useCourseQuery } from "generated/graphql";
import { useGetCourseInitials } from "hooks/useGetCourseInitials";
import { useRouter } from "next/router";
import { useState } from "react";

const Course = () => {
  const [sortingAttribute, setSortingAttribute] = useState("score");
  const [inputError, setInputError] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(false);

  const router = useRouter();
  const [_, addComment] = useAddCommentMutation();

  const courseInitials = useGetCourseInitials();

  const [{ data: courseData, fetching: courseFetching, error: courseError }] = useCourseQuery({
    variables: {
      initials: courseInitials,
      attribute: sortingAttribute,
      order: sortingAttribute === "Score" ? "ACS" : "DESC",
    },
  });

  const handleFormSubmit = async (event: any, newComment: string) => {
    event.preventDefault();

    const { error } = await addComment({
      courseInitials: courseData!.course.initials,
      content: newComment,
    });
    if (error) {
      switch (error.graphQLErrors[0].extensions!.code) {
        case "BAD_USER_INPUT":
          setInputError(true);
          break;

        case "UNAUTHENTICATED":
          setAuthenticationError(true);
          break;

        default:
          break;
      }

      return;
    }

    router.reload();
  };

  const handleSortingChange = (event: any) => {
    setSortingAttribute(event.target.value);
  };

  if (!courseData && !courseFetching) {
    router.push("/404");
    return <div></div>;
  }

  if (!courseData && courseFetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (courseError) {
    return <div>{courseError.message}</div>;
  }

  return (
    <Layout>
      <Box paddingLeft="2vw" marginTop="4vh">
        <Heading as="h1" fontSize="4xl" fontWeight="black">
          {courseData!.course.initials.toUpperCase()} - {courseData!.course.title}
        </Heading>
        <Text as="h2" fontSize="2xl" fontWeight="medium">
          Professeur: {courseData!.course.professor}
        </Text>
        <Text paddingTop="2vh">{courseData!.course.description}</Text>

        <Box marginTop="4vh">
          <Heading as="h2" marginBottom="3vh">
            Commentaires
          </Heading>
          <SortingBar onSelectChange={handleSortingChange} />
          {courseData!.course.comments.map((comment) => {
            const cookieName = `user-vote-${comment.id}`;
            return (
              <Stack
                className="comment"
                key={comment.id}
                maxWidth={{ sm: "100%", xl: "70vw" }}
                margin="6px"
                border="1px"
                borderRadius={12}
                direction="row"
                padding="1em"
              >
                <Comment
                  courseInitials={courseData!.course.initials}
                  id={comment.id}
                  score={comment.score}
                  content={comment.content}
                  isUserAuthor={comment.isUserAuthor}
                  createdAt={comment.createdAt}
                  author={comment.author}
                  subComments={comment.subComments}
                  userVote={comment.userVote}
                  nestingLevel={0}
                />
              </Stack>
            );
          })}
          <ReplySection authenticationError={authenticationError} inputError={inputError} onFormSubmit={handleFormSubmit} />
        </Box>
      </Box>
    </Layout>
  );
};

export default Course;
