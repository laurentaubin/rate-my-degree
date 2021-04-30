import { Badge, Stack } from "@chakra-ui/layout";
import { Avatar, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useAddCommentMutation } from "../generated/graphql";
import { formatDate } from "../utils/formatDate";
import { UpvoteSection } from "./UpvoteSection";

interface CommentProps {
  courseInitials: string;
  id: string;
  score: number;
  content: string;
  createdAt: string;
  subComments: [CommentProps] | [] | any;
  userVote: number;
  setCookie: (name: string, value: number) => void;
  nestingLevel: number;
}

export const Comment: React.FC<CommentProps> = ({
  courseInitials,
  id,
  score,
  content,
  createdAt,
  subComments,
  setCookie,
  userVote,
  nestingLevel,
}) => {
  const author = "Anonymous";

  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setInputError(false);
  }, [replying]);

  const [, addComment] = useAddCommentMutation();

  const [cookies, _] = useCookies(["user-vote"]);

  const router = useRouter();

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleReplyChange = (event: any) => {
    setReply(event.target.value);
  };

  const handleReplySubmit = async (event: any) => {
    event.preventDefault();
    const { error } = await addComment({ courseInitials: courseInitials, content: reply, parentId: id });
    if (error) {
      setInputError(true);
      return;
    }

    router.reload();
  };

  const handleCancelClick = () => {
    setReplying(false);
    setReply("");
  };

  return (
    <Stack width="100%" direction="column">
      <Flex>
        <Stack>
          <Avatar ddsrc="https://bit.ly/sage-adebayo" />
        </Stack>
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
          <Stack>
            <Textarea
              value={reply}
              backgroundColor="gray.100"
              placeholder="Ajouter un commentaire"
              maxWidth="70vw"
              marginLeft="1"
              onChange={handleReplyChange}
              isInvalid={inputError}
            ></Textarea>
            {inputError && (
              <Text marginLeft="1" color="red">
                Le contenu du commentaire ne peut pas être vide.
              </Text>
            )}
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
          </Stack>
        </form>
      )}
      <Stack direction="column">
        {subComments.length != 0 &&
          subComments.map((subComment: CommentProps) => {
            const cookieName = `user-vote-${subComment.id}`;
            return (
              <Stack
                key={subComment.id}
                marginLeft={nestingLevel < 6 ? "25px !important" : "0px"}
                direction="row"
                border="1px"
                borderRadius={12}
                padding="1rem"
              >
                <Comment
                  courseInitials={courseInitials}
                  id={subComment.id}
                  score={subComment.score}
                  content={subComment.content}
                  createdAt={subComment.createdAt}
                  subComments={subComment.subComments}
                  userVote={cookies[cookieName]}
                  setCookie={setCookie}
                  nestingLevel={nestingLevel + 1}
                />
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
