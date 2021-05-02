import { VStack, Text } from "@chakra-ui/layout";
import React from "react";
import { HomeHeader } from "@components/HomeHeader";
import { SearchBar } from "@components/SearchBar";

const Index = () => {
  return (
    <>
      <HomeHeader />
      <VStack
        height="80vh"
        paddingTop="15vh"
        backgroundImage="url(https://i.ibb.co/7b3NqVJ/Background-1.png)"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="100vw 80vh"
      >
        <Text fontWeight="bold" fontSize="7xl" color="white">
          Rate my GLO
        </Text>
        <Text
          fontWeight="medium"
          fontSize="lg"
          color="white"
          marginBottom="4vh"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor{" "}
        </Text>
        <SearchBar size={2} />
      </VStack>
    </>
  );
};
export default Index;
