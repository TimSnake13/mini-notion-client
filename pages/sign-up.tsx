import React, { useRef } from "react";
import Link from "next/link";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Container,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../components/auth/AuthContext";

const SignUp = () => {
  const emailRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const { signup } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    // if (pwRef?.current?.value === pwConfirmRef?.current?.value)
    // signup(emailRef.current?.value, pwRef.current.value);
  }
  return (
    <Center h="100vh">
      <Container maxW="lg">
        <Center>
          <Heading as="h2">Sign Up</Heading>
        </Center>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" required ref={emailRef} />
          <FormLabel>Password</FormLabel>
          <Input type="password" required ref={pwRef} />
          <FormHelperText>At least 6 characters long.</FormHelperText>{" "}
          <FormLabel>Password Confirm</FormLabel>
          <Input type="password" required ref={pwConfirmRef} />
        </FormControl>
        <Center mt="4">
          Already have an account?
          <Link href="/login">
            <a>Log In</a>
          </Link>
        </Center>
      </Container>
    </Center>
  );
};

export default SignUp;
