import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Center, Text } from "@chakra-ui/react";
import { useVoteMutation } from "@generated/graphql";
import React from "react";

interface UpvoteSectionProps {
  commentId: string;
  score: number;
  userVote: number;
  handleAuthenticationError: any;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ commentId, score, userVote, handleAuthenticationError }) => {
  const [, vote] = useVoteMutation();

  const handleUpvote = async () => {
    let score: number;

    if (userVote == 1) {
      score = -1;
    } else if (userVote == -1) {
      score = 2;
    } else {
      score = 1;
    }

    await sendVote(score);
  };

  const handleDownvote = async () => {
    let score: number;
    if (userVote == 1) {
      score = -2;
    } else if (userVote == -1) {
      score = 1;
    } else {
      score = -1;
    }

    await sendVote(score);
  };

  const sendVote = async (score: number) => {
    const { error } = await vote({ commentId: commentId, score: score });

    if (error) {
      handleAuthenticationError();
    }
  };

  return (
    <Center>
      <Box textAlign="center">
        <TriangleUpIcon color={userVote == 1 ? "upvote" : "black"} onClick={handleUpvote} _hover={{ cursor: "pointer" }} />
        <Text fontSize="md" fontWeight="semibold" userSelect="none">
          {score}
        </Text>
        <TriangleDownIcon color={userVote == -1 ? "downvote" : "black"} onClick={handleDownvote} _hover={{ cursor: "pointer" }} />
      </Box>
    </Center>
  );
};
