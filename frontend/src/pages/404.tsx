import { Text } from "@chakra-ui/layout";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { FourOFourPageBlob } from "@components/blobs/FourOFourPageBlob";
import { Layout } from "@components/Layout";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();

  const handleReturnToHomePageClick = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Flex width="100%" zIndex={-1} position="absolute">
        <FourOFourPageBlob marginLeft="auto" />
      </Flex>
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
          _hover={{}}
          fontSize="xl"
          marginX="14vw !important"
          marginTop="10vh !important"
          height="4rem"
        >
          Retourner à l'acceuil
        </Button>
      </Stack>
    </Layout>
  );
};

export default Index;
