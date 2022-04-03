import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import myTheme from "styles/theme/index";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={myTheme}>
      {/* // eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
