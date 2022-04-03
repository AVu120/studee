import { extendTheme } from "@chakra-ui/react";
import colors from "styles/theme/colors";
import Button from "styles/theme/components/button";
import global from "styles/theme/global";

const components = {
  Button,
};

const myTheme = extendTheme({ colors, components, styles: global });

export default myTheme;
