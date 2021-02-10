import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      maxWidth={variant === "small" ? "400px" : "900px"}
      w="100%"
      mx="auto"
      mt={8}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
