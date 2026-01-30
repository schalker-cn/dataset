import { MinusMini, PlusMini } from "@medusajs/icons"
import { IconButton, Input } from "@medusajs/ui"
import { useState } from "react"

type BulkTableQuantityProps = {
  variantId: string
  onChange: (variantId: string, quantity: number) => void
}

const BulkTableQuantity = ({ variantId, onChange }: BulkTableQuantityProps) => {
  const [quantity, setQuantity] = useState("0")
  const [shiftPressed, setShiftPressed] = useState(false)

  const handleAdd = () => {
    const q = Math.max(Number(quantity) + (shiftPressed ? 10 : 1), 0)
    setQuantity(q.toString())
    onChange(variantId, q)
  }


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
        onClick={() => handleAdd()}
        className="rounded-full hover:bg-neutral-200"
        variant="transparent"
      >
        <PlusMini />
      </IconButton>
    </div>
  )
}

export default BulkTableQuantity
