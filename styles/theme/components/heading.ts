import type { ComponentStyleConfig } from "@chakra-ui/theme";

export default {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg", "xl")
  sizes: {
    h1: { fontSize: { base: "3xl", md: "5xl", lg: "7xl" } },
  },
  // styles for different visual variants ("primary", "secondary", "warning")
  variants: {
    h1: {
      bgGradient: "linear(to-l, tertiary, primary)",
      bgClip: "text",
      fontWeight: "extrabold",
    },
  },
  // defaults values for `size` and `variant`
  defaultProps: {},
} as ComponentStyleConfig;
