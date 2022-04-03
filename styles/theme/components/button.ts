import type { ComponentStyleConfig } from "@chakra-ui/theme";
import { darken } from "@chakra-ui/theme-tools";

const getSolidStyle = (color: string) => ({
  bg: color,
  color: "white",
  _hover: {
    bg: darken(color, 10),
    boxShadow: "xl",
    transform: "scale(1.02)",
    _disabled: { boxShadow: "none", transform: "none", bg: color },
  },
});

const getOutlinedStyle = (color: string) => ({
  bg: "transparent",
  border: "1px solid",
  borderColor: color,
  color,
  _hover: {
    color: darken(color, 10),
    borderColor: darken(color, 10),
    boxShadow: "xl",
    transform: "scale(1.02)",
    _disabled: { boxShadow: "none", transform: "none" },
  },
});

export default {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg", "xl")
  sizes: {},
  // styles for different visual variants ("primary", "secondary", "warning")
  variants: {
    primary: getSolidStyle("primary"),
    secondary: getOutlinedStyle("primary"),
    danger: getSolidStyle("danger"),
  },
  // defaults values for `size` and `variant`
  defaultProps: {},
} as ComponentStyleConfig;
