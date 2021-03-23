import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { createClient } from "@urql/core";
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
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
