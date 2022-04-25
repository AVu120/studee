import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => (
  <Box
    boxShadow="md"
    padding="1rem"
    borderRadius="1rem"
    marginBottom="1rem"
    border="1px"
    borderColor="gray.300"
  >
    {children}
  </Box>
);
