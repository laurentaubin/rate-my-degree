import { Badge, Stack } from "@chakra-ui/layout";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useCookies } from "react-cookie";
import { useCommentQuery } from "../generated/graphql";
import { formatDate } from "../utils/formatDate";
import { Layout } from "./Layout";
import { UpvoteSection } from "./UpvoteSection";

interface CommentProps {
  commentId: string;
  userVote: number;
  setCookie: (name: string, value: number) => void;
}

export const Comment: React.FC<CommentProps> = ({ commentId, userVote, setCookie }) => {
  const [{ data, fetching }] = useCommentQuery({
    variables: {
      id: commentId,
    },
  });

  const [cookies, _] = useCookies(["user-vote"]);

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
      {subComments!.map((subComment) => {
        const cookieName = `user-vote-${subComment.id}`;
        return (
          <Stack direction="column">
            <Comment key={subComment.id} commentId={subComment.id} userVote={cookies[cookieName]} setCookie={setCookie} />
          </Stack>
        );
      })}
    </Flex>
  );
};
