import { Flex } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import { GoogleLogin } from "components/authentication/GoogleLogin";
import { HomePageBlob } from "components/blobs/HomePageBlob";
import FacebookIcon from "components/icons/FacebookIcon";
import WebsiteIcon from "components/icons/WebsiteIcon";
import useScreenSize from "hooks/useScreenSize";
import React from "react";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = ({}) => {
  const screenSize = useScreenSize();

  return (
    <>
      <Flex width="100%" zIndex={-1} position="absolute">
        <HomePageBlob marginLeft="auto" marginRight={[0, 0, 0, "15vw"]} size={screenSize} />
      </Flex>
      <Flex height={["150px", "20vh"]} paddingTop={["8", "4vh"]}>
        <Link href="https://www.facebook.com/groups/aeglo" isExternal marginRight="16px" marginLeft="15vw" height="20px">
          <FacebookIcon boxSize={5} color="black" />
        </Link>
        <Link href="http://aeglo.ift.ulaval.ca/" isExternal height="20px">
          <WebsiteIcon boxSize={5} color="black" />
        </Link>
        <GoogleLogin marginLeft="auto" marginRight={[5, "20vw", "25vw"]} backgroundColor="black" color="white" _hover={{}} />
      </Flex>
    </>
  );
};
