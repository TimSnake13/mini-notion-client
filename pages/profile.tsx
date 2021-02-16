import React, { useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { Button } from "@chakra-ui/react";
import AuthContext from "../src/components/auth/AuthContext";

function Profile() {
  // const [user, setUser] = useState(null);
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  async function signIn() {
    try {
      const _user = await Auth.signIn(
        emailRef.current.value,
        passwordRef.current.value
      );
      // setUser(_user);
      console.log(_user);
    } catch (error) {
      console.log("error signing in", error);
    }
  }

  return (
    <div>
      <AuthContext.Consumer>
        {({ user }) => <div>Welcome: {user?.attributes?.email}</div>}
      </AuthContext.Consumer>
      <form>
        <h3>Login Form: </h3>
        <label>Email: </label>
        <input type="text" ref={emailRef} />
        <label>Password: </label>
        <input type="password" ref={passwordRef} />
        <Button variant="solid" colorScheme="facebook" onClick={() => signIn()}>
          Submit
        </Button>
      </form>
      <Button
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Google,
          })
        }
      >
        Google Login hey
      </Button>
    </div>
  );
}

export default Profile;
