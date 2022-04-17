export default {
  global: {
    "html, body": {
      color: "gray.600",
      lineHeight: "tall",
      padding: 0,
      margin: 0,
    },
    "*": {
      boxSizing: "border-box",
    },
    a: {
      color: "teal.500",
      _hover: { textDecoration: "underline", cursor: "pointer" },
    },
    h1: {
      fontSize: { base: "1rem", md: "1.25rem", lg: "1.5rem" },
      fontWeight: "bold",
    },
    h2: {
      fontSize: { base: "1rem", md: "1.25rem", lg: "1.5rem" },
      textDecoration: "underline",
    },
  },
};
