import React, { useRef, useEffect } from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Editor } from "slate";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";
import { Range } from "slate";
import { Box, Button } from "@chakra-ui/react";
import { isFormatActive, toggleFormat } from "./NotesSection";

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });

  return (
    <Box borderRadius="4px" overflow="hidden">
      <Box
        ref={ref}
        // padding="8px 7px 6px"
        pos="absolute"
        zIndex={1}
        top="-10000px"
        left="-10000px"
        mt="-6px"
        opacity={0}
        bg="transparent"
        transition="opacity 0.75s"
      >
        <FormatButton format="bold">
          <AiOutlineBold />
        </FormatButton>
        <FormatButton format="italic">
          <AiOutlineItalic />
        </FormatButton>
        <FormatButton format="underlined">
          <AiOutlineUnderline />
        </FormatButton>
      </Box>
    </Box>
  );
};
const FormatButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <Button
      bg="#222"
      color="white"
      borderRadius="0px"
      reversed
      active={isFormatActive(editor, format).toString()}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      {children}
    </Button>
  );
};
