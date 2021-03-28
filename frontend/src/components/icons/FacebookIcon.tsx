import { ChakraProps, Icon } from "@chakra-ui/react";
import React from "react";

interface FacebookIconProps extends Omit<React.SVGAttributes<SVGElement>, keyof ChakraProps>, ChakraProps {}

const FacebookIcon: React.FC<FacebookIconProps> = (props) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M18.8958 -3.05176e-05H1.10417C0.494167 -3.05176e-05 0 0.494136 0 1.10414V18.8966C0 19.5058 0.494167 20 1.10417 20H10.6833V12.255H8.07667V9.23664H10.6833V7.0108C10.6833 4.42747 12.2608 3.0208 14.5658 3.0208C15.67 3.0208 16.6183 3.1033 16.895 3.13997V5.83997L15.2967 5.8408C14.0433 5.8408 13.8008 6.43664 13.8008 7.30997V9.23747H16.79L16.4008 12.2558H13.8008V20H18.8975C19.5058 20 20 19.5058 20 18.8958V1.10414C20 0.494136 19.5058 -3.05176e-05 18.8958 -3.05176e-05V-3.05176e-05Z"
    />
  </Icon>
);

export default FacebookIcon;
