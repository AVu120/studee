import { Heading, Textarea } from "@chakra-ui/react";
import { ChangeEvent } from "react";

import { Card } from "./Card";

interface Props {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
export const Notes = ({ onChange, value }: Props) => (
  <Card>
    <Heading as="h3" size="xs" textDecoration="underline" textAlign="center">
      NOTES
    </Heading>
    <Textarea
      mt="0.5rem"
      height="calc(100% - 2rem)"
      bg="gray.100"
      marginBottom="auto"
      variant="filled"
      resize="none"
      value={value}
      onChange={onChange}
    />
  </Card>
);
