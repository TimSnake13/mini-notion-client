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

import { DataStore } from "@aws-amplify/datastore";
import { Note } from "../src/models";

import { ReactReduxContext, useSelector, useDispatch } from "react-redux";

import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { setUser, selectUser } from "../src/redux/notesSlice";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;

// TODO: redux toolkit to manager

function Navbar() {
  const marginLeft = "4";

  // const [user, setUser] = useState<CognitoUserExt | null>(null);
  const [currentNoteID, setCurrentNoteID] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const authenticatedUser: CognitoUserExt | null = await Auth.currentAuthenticatedUser();
        // store.dispatch(userSlice.actions.setUser(authenticatedUser));
        // dispatch(setUser(authenticatedUser));
        console.log(authenticatedUser);
        const _user = useSelector(selectUser);
        console.log(_user);
      } catch {
        // console.log("The user isn't signed in");
        router.push("/");
      }
    };

    getUser();
  }, []);

  // async function fetchNotes(userID: string) {
  //   const notes = (await DataStore.query(Note)).filter(
  //     (n) => n.userID === userID
  //   );
  //   console.log(`My notes:`);
  //   console.log(notes);
  //   // TODO: Rank according to last modified?
  //   setCurrentNoteID(notes[0].id);
  //   setNotes(notes);
  // }

  // async function createNoteOnCloud(userID: string) {
  //   const newNote = await DataStore.save(
  //     new Note({
  //       content: "So many content in this string",
  //       userID: userID,
  //       lastModified: new Date().toISOString(),
  //     })
  //   );

  //   console.log(newNote);
  //   setCurrentNoteID(newNote.id);
  //   setNotes((array) => [...array, newNote]);
  // }

  // async function updateNoteOnCloud(noteID: string, newContent: string) {
  //   const original = await DataStore.query(Note, noteID);
  //   const updatedNote = await DataStore.save(
  //     Note.copyOf(original, (updated) => {
  //       updated.content = newContent;
  //       updated.lastModified = new Date().toISOString();
  //     })
  //   );
  //   console.log(updatedNote);
  // }

  // async function deleteNoteOnCloud(noteID: string) {
  //   if (!noteID) {
  //     console.warn("Note ID undefined or null... Cancelled delete");
  //     return;
  //   }
  //   setCurrentNoteID(null);
  //   setNotes((array) => array.filter((v) => v.id !== noteID));
  //   const toDelete = await DataStore.query(Note, noteID);
  //   DataStore.delete(toDelete);
  // }

  async function signOut() {
    try {
      await Auth.signOut();
      console.log("Sign Out Success");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
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
      <Button
        ml={marginLeft}
        // onClick={() => fetchNotes(user.attributes.sub)}
      >
        fetchNotes
      </Button>
      <Button
        ml={marginLeft}
        // onClick={() => createNoteOnCloud(user.attributes.sub)}
      >
        createNoteOnCloud
      </Button>
      <Button
        ml={marginLeft}
        // onClick={() => updateNoteOnCloud(currentNoteID, "New Note Content")}
      >
        updateNoteOnCloud
      </Button>
      <Button
        ml={marginLeft}
        // onClick={() => deleteNoteOnCloud(currentNoteID)}
      >
        deleteNoteOnCloud
      </Button>
    </Flex>
  );
}
