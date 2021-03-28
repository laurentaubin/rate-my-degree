import { InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import React from "react";
import FacebookIcon from "./icons/FacebookIcon";
import WebsiteIcon from "./icons/WebsiteIcon";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = ({}) => {
  return (
    <Flex
      height="20vh"
      paddingTop="4vh"
      backgroundImage="url(https://svgur.com/i/VYt.svg)"
      backgroundRepeat="no-repeat"
      backgroundPosition="60vw"
    >
      <InputGroup marginLeft="20vw">
        <InputLeftElement>
          <Link href="https://www.facebook.com/groups/aeglo" isExternal marginRight="16px">
            <FacebookIcon boxSize={5} color="black" />
          </Link>
          <Link href="http://aeglo.ift.ulaval.ca/" isExternal>
            <WebsiteIcon boxSize={5} color="black" />
          </Link>
        </InputLeftElement>
      </InputGroup>

      <InputGroup marginRight="30vw">
        <InputRightElement>
          <Text fontWeight="semibold" as="button" marginRight={2} minWidth="8em">
            Se connecter
          </Text>
          <Text fontWeight="semibold" as="button" color="white" backgroundColor="black" minWidth="6em" borderRadius={5}>
            S'inscrire
          </Text>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
