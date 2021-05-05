import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Center, Text } from "@chakra-ui/react";
import { useVoteMutation } from "@generated/graphql";
import React from "react";

interface UpvoteSectionProps {
  commentId: string;
  score: number;
  userVote: number;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ commentId, score, userVote }) => {
  const [, vote] = useVoteMutation();

  const handleUpvote = async () => {
    if (userVote == 1) {
      await vote({
        commentId: commentId,
        score: -1,
      });
    } else if (userVote == -1) {
      await vote({
        commentId: commentId,
        score: 2,
      });
    } else {
      await vote({
        commentId: commentId,
        score: 1,
      });
    }
  };

  const handleDownvote = async () => {
    if (userVote == 1) {
      await vote({
        commentId: commentId,
        score: -2,
      });
    } else if (userVote == -1) {
      await vote({
        commentId: commentId,
        score: 1,
      });
    } else {
      await vote({
        commentId: commentId,
        score: -1,
      });
    }
  };

  return (
    <Center>
      <Box textAlign="center">
        <TriangleUpIcon color={userVote == 1 ? "upvote" : "black"} onClick={handleUpvote} />
        <Text fontSize="md" fontWeight="semibold" userSelect="none">
          {score}
        </Text>
        <TriangleDownIcon color={userVote == -1 ? "downvote" : "black"} onClick={handleDownvote} />
      </Box>
    </Center>
  );
};
