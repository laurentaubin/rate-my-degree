import { Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import { GoogleLogin } from "@components/authentication/GoogleLogin";
import FacebookIcon from "@components/icons/FacebookIcon";
import WebsiteIcon from "@components/icons/WebsiteIcon";
import React from "react";

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
      <Link href="https://www.facebook.com/groups/aeglo" isExternal marginRight="16px" marginLeft="15vw" height="20px">
        <FacebookIcon boxSize={5} color="black" />
      </Link>
      <Link href="http://aeglo.ift.ulaval.ca/" isExternal height="20px">
        <WebsiteIcon boxSize={5} color="black" />
      </Link>
      <GoogleLogin marginLeft="auto" marginRight="25vw" backgroundColor="black" color="white" _hover={{}} />
    </Flex>
  );
};
