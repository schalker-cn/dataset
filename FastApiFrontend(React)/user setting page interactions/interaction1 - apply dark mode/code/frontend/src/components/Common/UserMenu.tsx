import {
  Box,
  IconButton,
  Menu,
  MenuButton,
} from "@chakra-ui/react"

const UserMenu = () => {

  return (
    <>
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        top={4}
        right={4}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            bg="#0606FC"
            isRound
            data-testid="user-menu"
          />
        </Menu>
      </Box>
    </>
  )
}

export default UserMenu
