import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Container,
  Center,
  Button,
  Heading,
} from "@chakra-ui/react";
import { signUp } from "../src/components/auth/SignUp";
import { FormErrorMessage } from "@chakra-ui/react";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { auth, db } from "../src/components/auth/firebase";

const signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Center h="100vh">
      <Container maxW="lg">
        <Center>
          <Heading as="h2">Sign Up</Heading>
        </Center>
        {/* {FormikForm()} */}
        {/* <Form>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" required ref={emailRef} />
            <FormLabel>Password</FormLabel>
            <Input type="password" required ref={pwRef} />
            <FormHelperText>At least 6 characters long.</FormHelperText>
            <FormLabel>Password Confirm</FormLabel>
            <Input type="password" required ref={pwConfirmRef} />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form> */}
        {TempSignUpForm()}
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

export default signup;

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

function TempSignUpForm() {
  const { register, errors, handleSubmit } = useForm();

  const createUser = (user) => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };
  const onSubmit = (data: SignUpData) => {
    return signUp(data).then((user) => {
      console.log(user);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="text"
          name="name"
          ref={register({
            required: "Please enter an name",
          })}
        />
        {errors.password && (
          <div className="mt-2 text-xs text-red-600">
            {errors.password.message}
          </div>
        )}
      </div>
      <div className="mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="email"
            name="email"
            ref={register({
              required: "Please enter an email",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Not a valid email",
              },
            })}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="password"
            name="password"
            ref={register({
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Should have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Sign up
          </button>
        </span>
      </div>
    </form>
  );
}

function FormikForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="email">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="passwordConfirm">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
