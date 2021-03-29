import { Badge, Stack } from "@chakra-ui/layout";
import { Avatar, Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useAddCommentMutation, useCommentQuery } from "../generated/graphql";
import { formatDate } from "../utils/formatDate";
import { Layout } from "./Layout";
import { UpvoteSection } from "./UpvoteSection";

interface CommentProps {
  courseInitials: string;
  commentId: string;
  userVote: number;
  setCookie: (name: string, value: number) => void;
}

export const Comment: React.FC<CommentProps> = ({ courseInitials, commentId, userVote, setCookie }) => {
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");

  const [{ data, fetching }] = useCommentQuery({
    variables: {
      id: commentId,
    },
  });

  const [, addComment] = useAddCommentMutation();

  const [cookies, _] = useCookies(["user-vote"]);

  const router = useRouter();

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

  const { id, author, content, createdAt, score, subComments } = { ...data!.comment, author: "Anonymous" };

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleReplyChange = (event: any) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = (event: any) => {
    event.preventDefault();
    addComment({ courseInitials: courseInitials, content: reply, parentId: commentId });
    router.reload();
  };

  const handleCancelClick = () => {
    setReplying(false);
    setReply("");
  };

  return (
    <Flex>
      <Avatar src="https://bit.ly/sage-adebayo" />
      <Box ml="3">
        <Text fontWeight="bold">
          {author}
          <Badge ml="1" colorScheme="green">
            {formatDate(new Date(parseInt(createdAt)))}
          </Badge>
        </Text>
        <Text fontSize="sm">{content}</Text>
      </Box>
      <UpvoteSection commentId={id} currentScore={score} initialUserVote={userVote} setCookie={setCookie} />
      {!replying && (
        <Button backgroundColor="main" onClick={handleReplyClick}>
          reply
        </Button>
      )}
      {replying && (
        <form>
          <Input value={reply} onChange={handleReplyChange}></Input>
          <Flex>
            <Button onClick={handleCancelClick}>cancel</Button>
            <Button type="submit" onClick={handleReplySubmit}>
              submit
            </Button>
          </Flex>
        </form>
      )}
      {subComments!.map((subComment) => {
        const cookieName = `user-vote-${subComment.id}`;
        return (
          <Stack key={subComment.id} direction="column">
            <Comment courseInitials={courseInitials} commentId={subComment.id} userVote={cookies[cookieName]} setCookie={setCookie} />
          </Stack>
        );
      })}
    </Flex>
  );
};
