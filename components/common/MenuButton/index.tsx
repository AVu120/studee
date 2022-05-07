import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  options: {
    title: string;
    onClick: () => void;
    isHidden?: boolean;
    href?: string;
  }[];
  ariaLabel: string;
  boxSize?: string;
  style?: CSSProperties;
}
export const MenuButtonComponent = ({
  icon: Icon,
  options,
  ariaLabel,
  boxSize,
  style,
}: Props) => (
  <Menu isLazy autoSelect placement="top">
    <MenuButton
      as={IconButton}
      aria-label={ariaLabel}
      // @ts-ignore
      icon={<Icon />}
      variant="outline"
      bg="transparent"
      border="none"
      boxSize={boxSize}
      style={style}
      _hover={{ bg: "transparent" }}
      _selected={{ bg: "transparent" }}
      _active={{ bg: "secondary" }}
    />
    <MenuList>
      {options.map(({ title, onClick, isHidden, href }) => (
        <MenuItem
          as={href ? "a" : "button"}
          onClick={onClick}
          // @ts-ignore
          href={href}
          hidden={isHidden}
          key={title}
        >
          {title}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
