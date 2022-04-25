import { extendTheme } from "@chakra-ui/react";
import colors from "styles/theme/colors";
import components from "styles/theme/components";
import global from "styles/theme/global";
import text from "styles/theme/text";

// const components = {
//   Button,
//   Heading,
//   Divider,
//   Input,
// };

const myTheme = extendTheme({
  colors,
  components,
  styles: global,
  textStyles: text,
});

export default myTheme;
