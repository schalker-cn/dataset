import type { ComponentType, ElementType } from "react"

import { Button, Flex, Icon} from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

interface NavbarProps {
  type: string
  addModalAs: ComponentType | ElementType
}

const Navbar = ({ type, addModalAs }: NavbarProps) => {

  return (
    <>
      <Flex py={8} gap={4}>
        <Button
          variant="primary"
          gap={1}
          fontSize={{ base: "sm", md: "inherit" }}
        >
          <Icon as={FaPlus} /> Add {type}
        </Button>
      </Flex>
    </>
  )
}

export default Navbar
