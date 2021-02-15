import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import React from "react";
import Link from "next/link";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </nav>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
