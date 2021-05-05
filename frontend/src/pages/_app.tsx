import { ChakraProvider } from "@chakra-ui/react";
import { createClient } from "@urql/core";
import { GoogleFonts } from "next-google-fonts";
import { AppProps } from "next/app";
import theme from "theme";
import { Provider } from "urql";

function MyApp({ Component, pageProps }: AppProps) {
  const urqlClient = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });

  return (
    <Provider value={urqlClient}>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;900&display=swap" />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
