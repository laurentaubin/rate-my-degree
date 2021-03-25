import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Comment } from "../../components/Comment";
import { useRouter } from "next/router";
import { useAddCommentMutation, useCourseQuery } from "../../generated/graphql";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { SortingBar } from "../../components/SortingBar";
import { Heading, Stack } from "@chakra-ui/layout";
import { useCookies } from "react-cookie";
import { Box } from "@chakra-ui/react";

const Course = () => {
  const [newComment, setNewComment] = useState("");
  const [sortingAttribute, setSortingAttribute] = useState("score");

  const router = useRouter();
  const { pid } = router.query;

  const [cookies, setCookie] = useCookies(["user-vote"]);

  const [, addComment] = useAddCommentMutation();

  const [{ data, fetching, error }] = useCourseQuery({
    variables: {
      initials: pid,
      attribute: sortingAttribute,
      order: sortingAttribute === "Score" ? "ACS" : "DESC",
    },
  });

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    console.log(newComment);
    addComment({ courseInitials: data!.course.initials, content: newComment });
    router.reload();
  };

  const handleCommentInputChange = (event: any) => setNewComment(event.target.value);

  const handleSortingChange = (event: any) => {
    console.log(event.target.value);
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
      <Heading>
        {data!.course.initials.toUpperCase()} - {data!.course.title}
      </Heading>
      <p>{data!.course.description}</p>
      <p>{data!.course.professor}</p>
      <Heading>Comments</Heading>
      <SortingBar onSelectChange={handleSortingChange} />
      {data!.course.comments.map((comment) => {
        const cookieName = `user-vote-${comment.id}`;
        return (
          !comment.isSubComment! && (
            <Stack maxW="md" margin="6px">
              <Comment key={comment.id} commentId={comment.id} userVote={cookies[cookieName]} setCookie={setCookie} />
            </Stack>
          )
        );
      })}
      <form onSubmit={handleFormSubmit}>
        <Input value={newComment} onChange={handleCommentInputChange} placeholder="Add comment"></Input>
        <Button type="submit"> submit</Button>
      </form>
    </Layout>
  );
};

export default Course;
