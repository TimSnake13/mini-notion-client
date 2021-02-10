import React, { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { Slate, Editable, withReact } from "slate-react";
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Node,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Input,
  Slide,
  SlideFade,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { initialValue } from "./initialValue";
import { v4 as uuid } from "uuid";
import NoteItem from "./NoteItem";
import { HoveringToolbar } from "./HoveringToolbar";
import { useCallback } from "react";
import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlinePlusSquare,
} from "react-icons/ai";
// import {
//   useCreateNoteMutation,
//   useUpdateNoteMutation,
// } from "../generated/graphql";

type SlateValueType = [
  {
    type?: string;
    children: [{ text: string; bold?: boolean; italic?: boolean }];
  }
];

interface InputTypeGQL {
  id: string;
  userId?: string;
  title?: string;
  content?: string;
}

const SaveStrToLocalStorage = (key: string, payload: string) => {
  localStorage.setItem(key, payload);
};
const LoadStrToLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
const DeleteItemFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

const NotesSection = () => {
  const defaultTitle = "NewTitle";

  const getIdsInitialState = () => {
    if (typeof window !== "undefined") {
      const ids_str = localStorage.getItem("ids");
      if (ids_str) return JSON.parse(ids_str);
    }
    return [] as string[];
  };
  const [ids, setIds] = useState<string[]>(getIdsInitialState);
  const [currentID, setCurrentID] = useState("");
  const [value, setValue] = useState(initialValue);
  const [title, setTitle] = useState(defaultTitle);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  //TODO: Read user id, combine it and sent to server
  const SaveNote = (name: string) => {
    // console.log("SAVE: " + name);
    // console.log("Value: " + JSON.stringify(value));
    SaveStrToLocalStorage(name, JSON.stringify(value));
    SaveStrToLocalStorage(name + "-title", title);
  };
  const LoadNote = (name: string) => {
    // console.log("LOAD: " + name);
    const str = LoadStrToLocalStorage(name);
    const t = LoadStrToLocalStorage(name + "-title");
    // console.log("Value: " + str);
    if (str) setValue(JSON.parse(str));
    else console.warn("localStorage not found data");
    if (t) setTitle(t);
    else setTitle(defaultTitle);
  };

  const handleNewNote = () => {
    const newID = uuid();
    setIds((current) => [...current, newID]);
    setCurrentID(newID);
    setValue(initialValue);
    setTitle(defaultTitle);
    // CreateNoteToServer({
    //   id: newID,
    //   userId: "tempID",
    //   title: defaultTitle,
    //   content: JSON.stringify(initialValue),
    // });

    // async (values: Values, { setErrors }) => {
    //   const response = await register({ variables: { data: values } });
    //   if (response.data?.createUser.errors) {
    //     setErrors(toErrorMap(response.data.createUser.errors));
    //   } else if (response.data?.createUser.user) {
    //     // Navigate to dashboard
    //     router.push("/");
    //   }
    // };
  };

  // const [createNote] = useCreateNoteMutation();
  // const CreateNoteToServer = async ({
  //   id,
  //   userId,
  //   title,
  //   content,
  // }: InputTypeGQL) => {
  //   const response = await createNote({
  //     variables: {
  //       data: {
  //         id,
  //         userId,
  //         title,
  //         content,
  //       },
  //     },
  //   });
  // };

  // const [updateNote] = useUpdateNoteMutation();
  // const UpdateNoteToServer = async ({
  //   id,
  //   userId,
  //   title,
  //   content,
  // }: InputTypeGQL) => {
  //   const response = await updateNote({
  //     variables: {
  //       data: {
  //         id,
  //         userId,
  //         title,
  //         content,
  //       },
  //     },
  //   });
  // };

  useLayoutEffect(() => {
    SaveStrToLocalStorage("ids", JSON.stringify(ids));
  }, [ids]);
  useEffect(() => {
    // First Render load ids from localStorage
    if (ids === []) {
      setIds(getIdsInitialState);
    }
  }, []);

  const handleCurrentIDChanged = (id: string) => {
    SaveNote(currentID);
    setCurrentID(id);
    LoadNote(id);
  };
  // TODO: delete on server
  // TODO: fetch data accourding to userId from server
  const handleDelete = () => {
    const _currentId = currentID;
    DeleteItemFromLocalStorage(_currentId);
    DeleteItemFromLocalStorage(_currentId + "-title");
    setIds((curr) => [...curr].filter((val) => val !== _currentId));

    setCurrentID(ids[0]);
  };

  return (
    <Flex direction="row" h={"100vh"}>
      <Flex direction="column" bg={"#E5E7EB"} pt={8} px={4}>
        {ids.map((id) => (
          <NoteItem
            key={id}
            id={id}
            title={LoadStrToLocalStorage(id + "-title") || ""}
            selected={id === currentID ? true : false}
            handleCurrentIDChanged={handleCurrentIDChanged}
          />
        ))}

        <Button
          leftIcon={<AiOutlinePlusSquare />}
          onClick={() => handleNewNote()}
          variant="ghost"
          colorScheme="blue"
          mt={2}
        >
          新的笔记
        </Button>
      </Flex>
      <Box px={8} pt={8} w="100%">
        {/* <Button
          onClick={() =>
            UpdateNoteToServer({ id: "somerandomid", content: "***New Title" })
          }
        >
          UpdateNote
        </Button> */}

        {/* <Button onClick={() => setValue(initialValue)}>Set Init value</Button>
        <Button onClick={() => SaveNote(currentID)}>SAVE</Button>
        <Button onClick={() => LoadNote(currentID)}>LOAD</Button> */}
        <Box pt={8}>
          <Flex>
            <Input
              placeholder={defaultTitle}
              size="lg"
              variant="flushed"
              mb={5}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              w={"50%"}
            />
            <Spacer />
            <Button
              onClick={() => handleDelete()}
              leftIcon={<AiOutlineDelete />}
              variant="outline"
            >
              Delete{" "}
            </Button>
          </Flex>

          <Slate
            editor={editor}
            value={value}
            onChange={(value) => {
              // setValue(value);
            }}
          >
            <HoveringToolbar />
            <Editable
              renderLeaf={(props) => <Leaf {...props} />}
              placeholder="Enter some text..."
              onDOMBeforeInput={(event) => {
                switch (event.inputType) {
                  case "formatBold":
                    event.preventDefault();

                    return toggleFormat(editor, "bold");
                  case "formatItalic":
                    event.preventDefault();

                    return toggleFormat(editor, "italic");
                  case "formatUnderline":
                    event.preventDefault();

                    return toggleFormat(editor, "underline");
                  default:
                    return false;
                }
              }}
            />
          </Slate>
        </Box>
      </Box>
    </Flex>
  );
};

export const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

export const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default NotesSection;
