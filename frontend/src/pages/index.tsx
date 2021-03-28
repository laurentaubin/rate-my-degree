import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Center, VStack, Text } from "@chakra-ui/layout";
import React from "react";
import { HomeHeader } from "../components/HomeHeader";

const Index = () => {
  return (
    <>
      <HomeHeader />
      <VStack
        height="80vh"
        paddingTop="15vh"
        backgroundImage="url(https://i.ibb.co/7b3NqVJ/Background-1.png)"
        backgroundSize=""
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Text fontWeight="bold" fontSize="7xl" color="white">
          Rate my GLO
        </Text>
        <Text fontWeight="medium" fontSize="lg" color="white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor{" "}
        </Text>
        <Center minWidth="30vw">
          <InputGroup marginTop="3vh">
            <InputLeftAddon minHeight="6vh">
              <SearchIcon />
            </InputLeftAddon>
            <Input placeholder="Rechercher un cours" minHeight="6vh" color="black" backgroundColor="white"></Input>
          </InputGroup>
        </Center>
      </VStack>
    </>
  );
};
export default Index;
