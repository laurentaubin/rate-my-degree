import { Flex, FlexOptions, HTMLChakraProps } from "@chakra-ui/react";
import React from "react";

interface FourOFourPageBlobProps extends HTMLChakraProps<"div">, FlexOptions {}

export const FourOFourPageBlob: React.FC<FourOFourPageBlobProps> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <svg width="655" height="860" viewBox="0 0 655 860" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M787.434 170.998C834.691 206.438 834.141 287.507 837.988 353.957C841.834 420.407 850.626 472.238 853.923 540.903C857.22 609.125 854.473 693.738 802.82 752.214C751.167 810.247 650.059 842.143 568.183 821.322C486.308 800.501 423.115 726.963 372.561 668.044C321.458 609.568 282.443 566.597 243.429 512.994C203.865 459.391 164.301 395.599 169.246 331.364C174.192 266.686 224.196 202.008 295.082 172.327C365.418 142.646 457.734 148.405 551.149 146.633C645.113 144.861 740.177 135.115 787.434 170.998Z"
          fill="#FDCD89"
        />
      </svg>
    </Flex>
  );
};
