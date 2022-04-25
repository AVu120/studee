import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  options: { title: string; onClick: () => void; isHidden?: boolean }[];
  ariaLabel: string;
}
export const MenuButtonComponent = ({
  icon: Icon,
  options,
  ariaLabel,
}: Props) => (
  <Menu isLazy autoSelect>
    <MenuButton
      as={IconButton}
      aria-label={ariaLabel}
      // @ts-ignore
      icon={<Icon />}
      variant="outline"
      bg="transparent"
      border="none"
      boxSize="1rem"
    />
    <MenuList>
      {options.map(({ title, onClick, isHidden }) => (
        <MenuItem onClick={onClick} hidden={isHidden}>
          {title}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
