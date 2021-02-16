import "../styles/globals.css";
import { Button, ChakraProvider, Flex, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import AuthContext from "../src/components/auth/AuthContext";
import { CognitoUserExt } from "../src/components/auth/authTypes";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }) {
  const marginLeft = "4";
  const [user, setUser] = useState<CognitoUserExt | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        setUser(authenticatedUser);
        console.log(authenticatedUser);
      } catch {
        // console.log("The user isn't signed in");
        router.push("/");
      }
    };

    getUser();
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
      console.log("Sign Out Success");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user }}>
        <div>
          <Flex>
            <NextLink href="/">
              <Link ml={marginLeft} marginY="auto">
                Home
              </Link>
            </NextLink>
            <NextLink href="/profile">
              <Link ml={marginLeft} marginY="auto">
                Profile
              </Link>
            </NextLink>
            <NextLink href="/dashboard">
              <Link ml={marginLeft} marginY="auto" marginRight="auto">
                Dashboard
              </Link>
            </NextLink>
            <Button ml={marginLeft} onClick={() => signOut()}>
              Sign Out
            </Button>
          </Flex>
          <Component {...pageProps} />
        </div>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
