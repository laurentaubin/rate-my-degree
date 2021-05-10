import { Text } from "@chakra-ui/layout";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { FourOFourPageBlob } from "components/blobs/FourOFourPageBlob";
import { Layout } from "components/Layout";
import useScreenSize from "hooks/useScreenSize";
import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const screenSize = useScreenSize();

  const router = useRouter();

  const handleReturnToHomePageClick = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Flex width="100%" zIndex={-1} position="absolute">
        <FourOFourPageBlob marginLeft="auto" size={screenSize} />
      </Flex>
      <Stack marginRight="33vw" marginLeft={["0", "0", "15vh"]} marginTop="10vh" textAlign="center">
        <Text fontSize={["7xl", "9xl"]} fontWeight="bold">
          404
        </Text>
        <Text fontSize={["xl", "4xl"]} fontWeight="semibold">
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
          marginX={["0.5rem !important", "14vw !important"]}
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
