import { Flex, FlexOptions, HTMLChakraProps } from "@chakra-ui/react";
import React from "react";

interface HomePageBlobProps extends HTMLChakraProps<"div">, FlexOptions {}

export const HomePageBlob: React.FC<HomePageBlobProps> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <svg width="395" height="199" viewBox="0 0 395 199" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
          <path
            d="M294.769 130.031C316.937 107.648 328.854 74.1344 353.374 45.4764C377.555 17.1518 414.39 -7.02943 419.606 -35.3006C425.162 -63.9051 399.413 -96.5767 382.148 -132.929C364.883 -169.281 356.416 -209.291 334.576 -234.874C312.762 -260.813 277.574 -272.325 241.502 -276.023C205.431 -279.72 168.449 -275.247 125.76 -266.174C83.0715 -257.102 34.9908 -243.408 19.8006 -208.342C4.61041 -173.275 22.9653 -117.147 23.2696 -64.8374C23.5739 -12.5282 6.48218 35.6509 13.5621 77.3507C20.6679 118.694 51.9453 153.559 88.4196 169.104C125.234 184.315 167.22 180.564 204.147 172.505C241.073 164.446 272.889 152.793 294.769 130.031Z"
            fill="#FDCD89"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="380.631" height="200.615" fill="white" transform="matrix(0.997367 0.072526 0.072526 -0.997367 0.181458 171.016)" />
          </clipPath>
        </defs>
      </svg>
    </Flex>
  );
};
