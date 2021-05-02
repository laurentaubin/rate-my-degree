import { DeleteIcon } from "@chakra-ui/icons";
import { Badge, Stack } from "@chakra-ui/layout";
import { Avatar, Box, Button, Center, Flex, IconButton, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDeleteCommentMutation } from "../generated/graphql";
import { formatDate } from "../utils/formatDate";
import { UpvoteSection } from "./UpvoteSection";

interface AuthorProp {
  name: string;
  pictureUrl: string;
}

interface CommentProps {
  courseInitials: string;
  id: string;
  score: number;
  content: string;
  isUserAuthor: boolean;
  createdAt: string;
  author: AuthorProp;
  subComments: [CommentProps] | [] | any;
  userVote: number;
  setCookie: (name: string, value: number) => void;
  handleReplySubmit: (event: any, content: string, commentId: string) => void;
  nestingLevel: number;
}

export const Comment: React.FC<CommentProps> = ({
  courseInitials,
  id,
  score,
  content,
  createdAt,
  isUserAuthor,
  author,
  subComments,
  setCookie,
  handleReplySubmit,
  userVote,
  nestingLevel,
}) => {
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState("");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    setInputError(false);
  }, [replying]);

  const [, deleteComment] = useDeleteCommentMutation();

  const [cookies, _] = useCookies(["user-vote"]);

  const router = useRouter();

  const handleDeleteComment = () => {
    deleteComment({ commentId: id });
    router.reload();
  };

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleReplyChange = (event: any) => {
    setReply(event.target.value);
  };

  const handleCancelClick = () => {
    setReplying(false);
    setReply("");
  };

  return (
    <Stack width="100%" direction="column">
      <Flex>
        <Avatar src={author.pictureUrl} />
        <Box ml="3">
          <Flex>
            <Text fontWeight="semibold">{author.name}</Text>
            <Badge marginLeft="2" backgroundColor="main">
              {formatDate(new Date(parseInt(createdAt)))}
            </Badge>
            {isUserAuthor && (
              <Center>
                <DeleteIcon marginLeft="6px" _hover={{ cursor: "pointer" }} onClick={handleDeleteComment} />
              </Center>
            )}
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
                onClick={(event) => handleReplySubmit(event, reply, id)}
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
                  isUserAuthor={subComment.isUserAuthor}
                  createdAt={subComment.createdAt}
                  author={subComment.author}
                  subComments={subComment.subComments}
                  userVote={cookies[cookieName]}
                  setCookie={setCookie}
                  handleReplySubmit={handleReplySubmit}
                  nestingLevel={nestingLevel + 1}
                />
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
