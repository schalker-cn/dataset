import { updateLineItem } from "@/lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Input, clx } from "@medusajs/ui"
import { useState, useRef, useEffect } from "react"

const AddNoteButton = ({
  item,
  disabled,
}: {
  item: HttpTypes.StoreCartLineItem
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [note, setNote] = useState((item.metadata?.note as string) || "")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const setNoteMetadata = async (newNote: string) => {
    setIsOpen(false)
    await updateLineItem({
      lineId: item.id,
      data: { quantity: item.quantity, metadata: { note: newNote?.trim() } },
    })
  }

  return (
    <div className="relative w-fit flex items-center justify-center">
      {!note && !isOpen && (
        <button
          className={clx(
            "text-neutral-950 text-xs shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-full px-2 py-1 w-fit min-w-20 h-6 flex items-center justify-center hover:bg-neutral-100 transition-all duration-300",
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
            disabled ? "opacity-50 pointer-events-none" : "opacity-100"
          )}
          disabled={disabled}
        >
          Add note
        </button>
      )}
    </div>
  )
}

export default AddNoteButton
