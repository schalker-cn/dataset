import { clx } from "@medusajs/ui"

const DeleteButton = ({
  id,
  className,
  disabled,
}: {
  id: string
  className?: string
  disabled?: boolean
}) => {

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className={clx(
          "text-neutral-950 text-xs shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-full px-2 py-1 hover:bg-neutral-100 min-w-20 flex items-center justify-center",
          disabled ? "opacity-50 pointer-events-none" : "opacity-100"
        )}
        disabled={disabled}
      >
        Remove
      </button>
    </div>
  )
}

export default DeleteButton
