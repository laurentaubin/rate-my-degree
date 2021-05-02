import { Flex, Text } from "@chakra-ui/layout";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { NavBar } from "@components/NavBar";

const Index = () => {
  const router = useRouter();

  const handleReturnToHomePageClick = () => {
    router.push("/");
  };

  return (
    <>
      <NavBar />
      <Flex
        height="80vh"
        backgroundImage="url(https://i.ibb.co/jwq1qZW/Background-2.png)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="100vw 80vh"
      >
        <Stack marginRight="33vw" marginLeft="15vw" marginTop="10vh" textAlign="center">
          <Text fontSize="9xl" fontWeight="bold">
            404
          </Text>
          <Text fontSize="4xl" fontWeight="semibold">
            La page que vous tentez d’accéder n’existe pas.
          </Text>
          <Button
            onClick={handleReturnToHomePageClick}
            backgroundColor="black"
            color="white"
            borderColor="black"
            border="1px"
            _hover={{ color: "black", backgroundColor: "white" }}
            _selection={{}}
            fontSize="xl"
            marginX="14vw !important"
            marginTop="10vh !important"
            height="4rem"
          >
            Retourner à l'acceuil
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default Index;
