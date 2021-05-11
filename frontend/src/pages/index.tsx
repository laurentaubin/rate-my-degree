import { Text, VStack } from "@chakra-ui/layout";
import { HomeHeader } from "components/navigation/HomeHeader";
import { SearchBar } from "components/SearchBar";
import React from "react";

const Index = () => {
  return (
    <>
      <HomeHeader />
      <VStack
        height="80vh"
        paddingTop="15vh"
        backgroundImage="url(https://i.ibb.co/7b3NqVJ/Background-1.png)"
        backgroundPosition="bottom"
        backgroundSize="cover"
      >
        <Text fontWeight="bold" fontSize={["5xl", "7xl"]} color="white">
          Rate my GLO
        </Text>
        <Text fontWeight="medium" fontSize="lg" color="white" marginBottom="4vh" paddingLeft="5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
        <SearchBar size={2} width={["100%", "50%"]} />
      </VStack>
    </>
  );
};
export default Index;
