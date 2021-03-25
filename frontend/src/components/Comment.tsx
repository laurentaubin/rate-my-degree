import { Badge } from "@chakra-ui/layout";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { formatDate } from "../utils/formatDate";
import { UpvoteSection } from "./UpvoteSection";

interface CommentProps {
  comment: { id: string; author: string; createdAt: string; content: String; score: number };
  userVote: number;
  setCookie: (name: string, value: number) => void;
}

export const Comment: React.FC<CommentProps> = ({ comment, userVote, setCookie }) => {
  const { id, author, content, createdAt, score } = comment;
  return (
    <Flex borderWidth="1px" maxW="sm" borderRadius="lg" margin="6px">
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
    </Flex>
  );
};
