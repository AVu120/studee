import { extendTheme } from "@chakra-ui/react";
import colors from "styles/theme/colors";
import Button from "styles/theme/components/button";

const components = {
  Button,
};

const myTheme = extendTheme({ colors, components });

export default myTheme;
