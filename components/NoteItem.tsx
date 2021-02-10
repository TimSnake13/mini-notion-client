import { Box, Button, Center } from "@chakra-ui/react";
import React from "react";
import { NoteObj } from "./types";

interface Props {
  id: string;
  title: string;
  selected: boolean;
  handleCurrentIDChanged: (id: string) => void;
}

const NoteItem = ({ id, title, selected, handleCurrentIDChanged }: Props) => {
  return (
    <Box
      bg={selected ? "teal.500" : "grey.600"}
      color={selected ? "white" : "black"}
      boxShadow="base"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      padding={5}
      pos="relative"
      w={"200px"}
      mx={1}
      mb={1}
      cursor="pointer"
      onMouseDown={() => handleCurrentIDChanged(id)}
    >
      <p>{title === "" ? "Untitled Note" : title}</p>
    </Box>
  );
};
export default NoteItem;
