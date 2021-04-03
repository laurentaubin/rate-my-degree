import { Flex, Text } from "@chakra-ui/layout";
import { InputGroup, InputRightElement, Link } from "@chakra-ui/react";
import React from "react";
import { SearchBar } from "./SearchBar";

export const NavBar: React.FC<{}> = () => {
  return (
    <Flex backgroundColor="black" minHeight="12vh">
      <Link href="/" marginTop="4vh" minWidth="12rem" marginLeft="5vw">
        <Text fontWeight="bold" fontSize="2xl" color="white">
          Rate my GLO
        </Text>
      </Link>
      <SearchBar size={1} paddingLeft="20vw" />

      <InputGroup marginTop="4vh" marginRight="15vw">
        <InputRightElement>
          <Text fontWeight="semibold" as="button" color="white" marginRight={2} minWidth="8em">
            Se connecter
          </Text>
          <Text
            fontWeight="semibold"
            as="button"
            color="white"
            borderColor="yellow"
            border="1px"
            minWidth="6em"
            borderRadius={5}
            padding={1}
          >
            S'inscrire
          </Text>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
