import { MinusMini, PlusMini } from "@medusajs/icons"
import { IconButton, Input } from "@medusajs/ui"
import { useEffect, useState } from "react"

type BulkTableQuantityProps = {
  variantId: string
  onChange: (variantId: string, quantity: number) => void
}

const BulkTableQuantity = ({ variantId, onChange }: BulkTableQuantityProps) => {
  const [quantity, setQuantity] = useState("0")

  return (
    <div className="flex flex-row justify-between gap-2 w-full">
      <IconButton
        className="rounded-full hover:bg-neutral-200"
        variant="transparent"
      >
        <MinusMini />
      </IconButton>
      <Input
        value={quantity}
        type="number"
        className="max-w-10 text-center items-center justify-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <IconButton
        className="rounded-full hover:bg-neutral-200"
        variant="transparent"
      >
        <PlusMini />
      </IconButton>
    </div>
  )
}

export default BulkTableQuantity
