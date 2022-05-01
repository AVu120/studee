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
    />
    <MenuList>
      {options.map(({ title, onClick, isHidden, href }) => (
        <MenuItem onClick={onClick} hidden={isHidden} key={title}>
          {href ? (
            <Text as="a" href={href} textDecoration="none" color="inherit">
              {title}
            </Text>
          ) : (
            title
          )}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
