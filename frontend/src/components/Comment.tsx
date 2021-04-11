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
  nestingLevel: number;
}

export const Comment: React.FC<CommentProps> = ({ courseInitials, commentId, userVote, setCookie, nestingLevel: nestingLevel }) => {
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
    <Stack width="100%" direction="column">
      <Flex>
        <Avatar ddsrc="https://bit.ly/sage-adebayo" />
        <Box ml="3">
          <Flex>
            <Text fontWeight="semibold">{author}</Text>
            <Badge marginLeft="2" backgroundColor="main">
              {formatDate(new Date(parseInt(createdAt)))}
            </Badge>
          </Flex>
          <Text fontSize="sm" marginTop="8px" paddingRight="16px">
            {content}
          </Text>
        </Box>
        <Box marginLeft="auto" minWidth="12vh">
          <UpvoteSection commentId={id} currentScore={score} initialUserVote={userVote} setCookie={setCookie} />
          {!replying && (
            <Button backgroundColor="white" border="2px" _hover={{ backgroundColor: "main" }} borderColor="main" onClick={handleReplyClick}>
              Répondre
            </Button>
          )}
        </Box>
      </Flex>
      {replying && (
        <form>
          <Input
            marginTop="12px"
            value={reply}
            placeholder="Ajouter une réponse"
            backgroundColor="gray.100"
            onChange={handleReplyChange}
          ></Input>
          <Flex>
            <Button backgroundColor="white" border="1px" borderColor="black" onClick={handleCancelClick}>
              Annuler
            </Button>
            <Button
              type="submit"
              border="2px"
              borderColor="main"
              backgroundColor="main"
              _hover={{ backgroundColor: "mainSelected" }}
              onClick={handleReplySubmit}
            >
              Soumettre
            </Button>
          </Flex>
        </form>
      )}
      <Stack direction="column">
        {subComments!.map((subComment) => {
          const cookieName = `user-vote-${subComment.id}`;
          return (
            <Stack key={subComment.id} marginLeft={nestingLevel < 6 ? "30px" : "0px"} direction="row">
              <Comment
                courseInitials={courseInitials}
                commentId={subComment.id}
                userVote={cookies[cookieName]}
                setCookie={setCookie}
                nestingLevel={nestingLevel++}
              />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
