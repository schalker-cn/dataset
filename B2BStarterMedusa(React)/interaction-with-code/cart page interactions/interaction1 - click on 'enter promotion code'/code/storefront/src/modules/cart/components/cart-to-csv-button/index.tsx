"use client"

import Button from "@/modules/common/components/button"
import { B2BCart } from "@/types"
import { useState } from "react"

type CartToCsvButtonProps = {
  cart: B2BCart
}

const CartToCsvButton = ({ cart }: CartToCsvButtonProps) => {
  const [isExportingCart, setIsExportingCart] = useState(false)

  return (
    <div className="flex flex-col gap-y-2 items-center">
      <Button
        className="w-full h-10 rounded-full shadow-borders-base"
        variant="secondary"
        isLoading={isExportingCart}
      >
        Export Cart (.csv)
      </Button>
    </div>
  )
}

export default CartToCsvButton
