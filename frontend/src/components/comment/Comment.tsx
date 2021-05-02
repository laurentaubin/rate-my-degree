import { DeleteIcon } from "@chakra-ui/icons";
import { Badge, Stack } from "@chakra-ui/layout";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "@generated/graphql";
import { formatDate } from "@utils/formatDate";
import { UpvoteSection } from "@components/comment/UpvoteSection";
import { ReplySection } from "./ReplySection";

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
  userVote,
  nestingLevel,
}) => {
  const [replying, setReplying] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(false);

  useEffect(() => {
    setInputError(false);
    setAuthenticationError(false);
  }, [replying]);

  const [, deleteComment] = useDeleteCommentMutation();

  const [cookies, _] = useCookies(["user-vote"]);

  const router = useRouter();
  const [, addComment] = useAddCommentMutation();

  const handleDeleteComment = () => {
    deleteComment({ commentId: id });
    router.reload();
  };

  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleCancelClick = () => {
    setReplying(false);
  };

  const handleFormSubmit = async (event: any, content: string) => {
    event.preventDefault();
    const { error } = await addComment({
      courseInitials: courseInitials,
      content: content,
      parentId: id,
    });
    if (error) {
      switch (error.graphQLErrors[0].extensions!.code) {
        case "BAD_USER_INPUT":
          setInputError(true);
          break;

        case "UNAUTHENTICATED":
          setAuthenticationError(true);
          break;

        default:
          break;
      }

      return;
    }

    router.reload();
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
                <DeleteIcon
                  marginLeft="6px"
                  _hover={{ cursor: "pointer" }}
                  onClick={handleDeleteComment}
                />
              </Center>
            )}
          </Flex>
          <Text fontSize="sm" marginTop="8px" paddingRight="16px">
            {content}
          </Text>
        </Box>
        <Box marginLeft="auto" minWidth="12vh">
          <UpvoteSection
            commentId={id}
            currentScore={score}
            initialUserVote={userVote}
            setCookie={setCookie}
          />
          {!replying && (
            <Button
              backgroundColor="white"
              border="2px"
              _hover={{ backgroundColor: "main" }}
              borderColor="main"
              onClick={handleReplyClick}
            >
              Répondre
            </Button>
          )}
        </Box>
      </Flex>
      {replying && (
        <ReplySection
          authenticationError={authenticationError}
          inputError={inputError}
          onCancel={handleCancelClick}
          onFormSubmit={handleFormSubmit}
        />
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
                  nestingLevel={nestingLevel + 1}
                />
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
