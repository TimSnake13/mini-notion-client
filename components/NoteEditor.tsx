import { Button, Input } from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Note, NotePayload, NotesReturn } from "../types";
import useNotesData from "../utils/useNotesData";

interface Props {
  notes: NotesReturn;
  newId: string;
}

const NoteEditor = ({ notes, newId }: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []); // stable across renders
  const [id, setId] = useState(newId);

  // const { set: setPersistedValue, get: getPersistedValue } = useNote(
  //   [
  //     {
  //       type: "paragraph",
  //       children: [{ text: "A line of text in a paragraph." }],
  //     },
  //   ],
  //   id
  // );

  function saveToPersistedState(s: string) {
    console.log(s + "CurrentID: [" + id + "]");
    // console.log("Saving after 500ms...");
    if (value) notes.setPayload(id, value);
  }
  function getFromPersistedState() {
    return notes.getPayload(id);
  }

  useEffect(() => {
    setId(newId);
    return () => {
      // Before change to new ID, save the content to prev ID
      saveToPersistedState("Before set to newID");
    };
  }, [newId]);
  const [value, setValue] = useState<NotePayload>(() => [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // If ID changed:
  // Save current and load new value from Persisted State
  useEffect(() => {
    const initialValue: NotePayload = getFromPersistedState();
    if (initialValue !== null) setValue(initialValue);
    return () => {};
  }, [id]);

  // 500ms delay & save to Persisted State
  const timeoutRef = useRef(null);
  useEffect(() => {
    // if (timeoutRef.current !== null) {
    //   clearTimeout(timeoutRef.current);
    // }

    // timeoutRef.current = setTimeout(() => {
    //   timeoutRef.current = null;
    //   value !== null ? saveToPersistedState("Time out SAVE") : null;
    // }, 500);
    saveToPersistedState("QUICK SAVE ");
  }, [value]);

  useEffect(() => {
    return () => {
      saveToPersistedState("Unmount SAVE");
    };
  }, []);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <>
      <div>
        {/* <Input value={"New Note"} /> */}
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </Button>
        <Button
          onMouseDown={(event) => {
            event.preventDefault();
            localStorage.removeItem(id);
          }}
        >
          Delete local storage data
        </Button>
        {/* <p>Current Values: {value && value[0][0].text}</p> */}
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => {
            setValue(value);
            // Save the value to Local Storage.
            //   const content = JSON.stringify(value);
            // localStorage.setItem("content", serialize(value));
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              // if (event.key === "&") {
              //   // Prevent the ampersand character from being inserted.
              //   console.log("clicked and");
              //   event.preventDefault();
              //   // Execute the `insertText` method when the event occurs.
              //   editor.insertText("and");
              // }
              if (!event.ctrlKey) {
                return;
              }
              switch (event.key) {
                // When "`" is pressed, keep our existing code block logic.
                case "`": {
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                  break;
                }

                // When "B" is pressed, bold the text in the selection.
                case "b": {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                  break;
                }
              }
            }}
          />
        </Slate>
      </div>
    </>
  );
};

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => NoteEditor.isBlock(editor, n) }
    );
  },
};

export default NoteEditor;
