import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { Comment } from "../../components/Comment";
import { useAddCommentMutation, useCourseQuery, useMeQuery } from "../../generated/graphql";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { SortingBar } from "../../components/SortingBar";
import { Heading, Stack } from "@chakra-ui/layout";
import { useCookies } from "react-cookie";
import { useGetCourseInitials } from "../../hooks/useGetCourseInitials";
import { useRouter } from "next/router";
import { Box, Textarea } from "@chakra-ui/react";

const Course = () => {
  const [newComment, setNewComment] = useState("");
  const [sortingAttribute, setSortingAttribute] = useState("score");
  const [authenticationError, setAuthenticationError] = useState(false);
  const [inputError, setInputError] = useState(false);

  const router = useRouter();

  const courseInitials = useGetCourseInitials();

  const [cookies, setCookie] = useCookies(["user-vote"]);

  const [, addComment] = useAddCommentMutation();

  const [{ data: courseData, fetching: courseFetching, error: courseError }] = useCourseQuery({
    variables: {
      initials: courseInitials,
      attribute: sortingAttribute,
      order: sortingAttribute === "Score" ? "ACS" : "DESC",
    },
  });

  const [{ data: meData }] = useMeQuery();

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    if (!meData) {
      setAuthenticationError(true);
      return;
    }

    const { error } = await addComment({ courseInitials: courseData!.course.initials, content: newComment, authorId: meData!.me.id });
    if (error) {
      setInputError(true);
      return;
    }

    router.reload();
  };

  const handleReplySubmit = async (event: any, content: string, commentId: string) => {
    event.preventDefault();
    const { error } = await addComment({ courseInitials: courseInitials, content: content, parentId: commentId, authorId: meData!.me.id });
    if (error) {
      setInputError(true);
      return;
    }

    router.reload();
  };

  const handleCommentInputChange = (event: any) => setNewComment(event.target.value);

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
                  createdAt={comment.createdAt}
                  author={comment.author}
                  subComments={comment.subComments}
                  userVote={cookies[cookieName]}
                  setCookie={setCookie}
                  handleReplySubmit={handleReplySubmit}
                  nestingLevel={0}
                />
              </Stack>
            );
          })}
          <form onSubmit={handleFormSubmit}>
            <Stack>
              <Textarea
                value={newComment}
                backgroundColor="gray.100"
                placeholder="Ajouter un commentaire"
                maxWidth="70vw"
                marginLeft="1"
                onChange={handleCommentInputChange}
                isInvalid={inputError || authenticationError}
              ></Textarea>
              {inputError && (
                <Text marginLeft="1" color="red">
                  Le contenu du commentaire ne peut pas être vide.
                </Text>
              )}
              {authenticationError && (
                <Text marginLeft="1" color="red">
                  Vous devez être authentifié pour ajouter un commentaire.
                </Text>
              )}
              <Button
                type="submit"
                backgroundColor="main"
                maxWidth="8rem"
                marginLeft="1"
                _hover={{ backgroundColor: "white", border: "1px", borderColor: "main" }}
              >
                Soumettre
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Layout>
  );
};

export default Course;
