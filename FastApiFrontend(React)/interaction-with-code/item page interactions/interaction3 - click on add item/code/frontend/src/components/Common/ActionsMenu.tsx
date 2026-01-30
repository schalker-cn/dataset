import {
  Button,
  Menu,
  MenuButton,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"

import type { ItemPublic, UserPublic } from "../../client"

interface ActionsMenuProps {
  type: string
  value: ItemPublic | UserPublic
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
      </Menu>
    </>
  )
}

export default ActionsMenu
