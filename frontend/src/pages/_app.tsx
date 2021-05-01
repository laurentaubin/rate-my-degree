import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { createClient } from "@urql/core";
import { Provider } from "urql";
import { GoogleFonts } from "next-google-fonts";
import { AppProvider } from "../context/context";

function MyApp({ Component, pageProps }: AppProps) {
  const urqlClient = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });

  return (
    <AppProvider>
      <Provider value={urqlClient}>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap" />
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </AppProvider>
  );
}

export default MyApp;
