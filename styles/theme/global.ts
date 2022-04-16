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
      fontSize: { base: "1rem", md: "2rem", lg: "3rem" },
      fontWeight: "bold",
    },
  },
};
