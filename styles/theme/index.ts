import { extendTheme } from "@chakra-ui/react";
import colors from "styles/theme/colors";
import Button from "styles/theme/components/button";
import Divider from "styles/theme/components/divider";
import Heading from "styles/theme/components/heading";
import global from "styles/theme/global";
import text from "styles/theme/text";

const components = {
  Button,
  Heading,
  Divider,
};

const myTheme = extendTheme({
  colors,
  components,
  styles: global,
  textStyles: text,
});

export default myTheme;
