import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { Comment } from "../../components/Comment";
import { useAddCommentMutation, useCourseQuery } from "../../generated/graphql";
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

  const router = useRouter();

  const courseInitials = useGetCourseInitials();

  const [cookies, setCookie] = useCookies(["user-vote"]);

  const [, addComment] = useAddCommentMutation();

  const [{ data, fetching, error }] = useCourseQuery({
    variables: {
      initials: courseInitials,
      attribute: sortingAttribute,
      order: sortingAttribute === "Score" ? "ACS" : "DESC"
    }
  });

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    addComment({ courseInitials: data!.course.initials, content: newComment });
    router.reload();
  };

  const handleCommentInputChange = (event: any) => setNewComment(event.target.value);

  const handleSortingChange = (event: any) => {
    setSortingAttribute(event.target.value);
  };

  if (!data && !fetching) {
    return <div>fucky wucky</div>;
  }

  if (!data && fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Layout>
      <Box paddingLeft="2vw" marginTop="4vh">
        <Heading as="h1" fontSize="4xl" fontWeight="black">
          {data!.course.initials.toUpperCase()} - {data!.course.title}
        </Heading>
        <Text as="h2" fontSize="2xl" fontWeight="medium">
          Professeur: {data!.course.professor}
        </Text>
        <Text paddingTop="2vh">{data!.course.description}</Text>

        <Box marginTop="4vh">
          <Heading as="h2" marginBottom="3vh">
            Commentaires
          </Heading>
          <SortingBar onSelectChange={handleSortingChange} />
          <Box marginTop="4vh">
            {data!.course.comments.map((comment) => {
              const cookieName = `user-vote-${comment.id}`;
              return (
                !comment.isSubComment! && (
                  <Stack key={comment.id} maxWidth="70vw" margin="6px" border="1px" borderRadius={12} direction="row" padding="1em">
                    <Comment
                      courseInitials={data!.course.initials}
                      commentId={comment.id}
                      userVote={cookies[cookieName]}
                      setCookie={setCookie}
                    />
                  </Stack>
                )
              );
            })}
          </Box>
          <form onSubmit={handleFormSubmit}>
            <Stack>
              <Textarea
                value={newComment}
                backgroundColor="gray.100"
                placeholder="Add comment"
                maxWidth="70vw"
                marginLeft="1"
                onChange={handleCommentInputChange}
              ></Textarea>
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
