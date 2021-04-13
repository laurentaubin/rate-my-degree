import { Flex, Text } from "@chakra-ui/layout";
import { Center, Link } from "@chakra-ui/react";
import React from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { SearchBar } from "./SearchBar";

export const NavBar: React.FC<{}> = () => {
  const { width } = useWindowDimensions();

  return (
    <Flex backgroundColor="black" minHeight="12vh">
      <Link href="/" marginTop="4vh" minWidth="12rem" marginLeft="5vw">
        <Text fontWeight="bold" fontSize="2xl" color="white">
          Rate my GLO
        </Text>
      </Link>
      {width > 600 && <SearchBar size={1} width="300px" />}
      <Center marginLeft="auto" marginRight="32px">
        <Text fontWeight="semibold" as="button" color="white" marginRight={2} minWidth="8em">
          Se connecter
        </Text>
        <Text fontWeight="semibold" as="button" color="white" borderColor="yellow" border="1px" minWidth="6em" borderRadius={5} padding={1}>
          S'inscrire
        </Text>
      </Center>
    </Flex>
  );
};
