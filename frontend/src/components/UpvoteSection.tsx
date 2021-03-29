import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  commentId: string;
  currentScore: number;
  initialUserVote: number;
  setCookie: (name: string, value: number) => void;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ commentId, currentScore, initialUserVote, setCookie }) => {
  const [userVote, setUserVote] = useState(initialUserVote);
  const [score, setScore] = useState(currentScore);

  const [, vote] = useVoteMutation();

  const handleUpvote = async () => {
    if (userVote == 1) {
      setScore(score - 1);
      setUserVote(0);
      await vote({
        commentId: commentId,
        score: -1,
      });
      setCookie(`user-vote-${commentId}`, 0);
    } else if (userVote == -1) {
      setScore(score + 2);
      setUserVote(1);
      await vote({
        commentId: commentId,
        score: 2,
      });
      setCookie(`user-vote-${commentId}`, 1);
    } else {
      setScore(score + 1);
      setUserVote(1);
      await vote({
        commentId: commentId,
        score: 1,
      });
      setCookie(`user-vote-${commentId}`, 1);
    }
  };

  const handleDownvote = async () => {
    if (userVote == 1) {
      setScore(score - 2);
      setUserVote(-1);
      await vote({
        commentId: commentId,
        score: -2,
      });
      setCookie(`user-vote-${commentId}`, -1);
    } else if (userVote == -1) {
      setScore(score + 1);
      setUserVote(0);
      await vote({
        commentId: commentId,
        score: 1,
      });
      setCookie(`user-vote-${commentId}`, 0);
    } else {
      setScore(score - 1);
      setUserVote(-1);
      await vote({
        commentId: commentId,
        score: -1,
      });
      setCookie(`user-vote-${commentId}`, -1);
    }
  };

  return (
    <Box marginLeft="24px">
      <TriangleUpIcon color={userVote == 1 ? "upvote" : "black"} onClick={handleUpvote} />
      <Text fontSize="md" fontWeight="semibold" userSelect="none">
        {score}
      </Text>
      <TriangleDownIcon color={userVote == -1 ? "downvote" : "black"} onClick={handleDownvote} />
    </Box>
  );
};
