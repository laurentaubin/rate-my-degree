import { Flex, Text } from "@chakra-ui/layout";
import { Box, Center } from "@chakra-ui/react";
import { GoogleLogin } from "@components/authentication/GoogleLogin";
import { SearchBar } from "@components/SearchBar";
import useWindowDimensions from "@hooks/useScreenSize";
import { isScreenLargeOrExtraLarge } from "@utils/screenSizeUtils";
import React from "react";
import { WindowSize } from "types";
import { NextChakraLink } from "./NextChakraLink";

export const NavBar: React.FC<{}> = () => {
  const screenSize = useWindowDimensions();

  return (
    <Flex backgroundColor="black" minHeight="12vh">
      <NextChakraLink href="/" marginTop="4vh" minWidth="12rem" marginLeft="5vw" height="36px">
        <Text fontWeight="bold" fontSize="2xl" color="white">
          Rate my GLO
        </Text>
      </NextChakraLink>
      {screenSize !== WindowSize.sm && (
        <Box marginTop="4vh" marginLeft={isScreenLargeOrExtraLarge(screenSize) ? "10vw" : "0"}>
          <SearchBar size={1.5} position="absolute" />
        </Box>
      )}
      <Center marginLeft="auto" marginRight="32px">
        <GoogleLogin backgroundColor="black" color="white" borderColor="white" border="1px" _hover={{}} />
      </Center>
    </Flex>
  );
};
