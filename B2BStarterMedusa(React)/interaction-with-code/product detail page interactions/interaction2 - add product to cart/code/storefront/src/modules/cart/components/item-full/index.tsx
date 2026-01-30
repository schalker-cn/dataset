"use client"

import AddNoteButton from "@/modules/cart/components/add-note-button"
import DeleteButton from "@/modules/common/components/delete-button"
import LineItemPrice from "@/modules/common/components/line-item-price"
import Thumbnail from "@/modules/products/components/thumbnail"
import { HttpTypes } from "@medusajs/types"
import { clx, Container, Input } from "@medusajs/ui"
import { useEffect, useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  showBorders?: boolean
  currencyCode: string
  disabled?: boolean
}

const ItemFull = ({
  item,
  showBorders = true,
  currencyCode,
  disabled,
}: ItemProps) => {

  const [quantity, setQuantity] = useState(item.quantity.toString())

  useEffect(() => {
    setQuantity(item.quantity.toString())
  }, [item.quantity])


  const maxQuantity = item.variant?.inventory_quantity ?? 100

  return (
    <Container
      className={clx("flex gap-4 w-full h-full items-center justify-between", {
        "shadow-none": !showBorders,
      })}
    >
      <div className="flex gap-x-4 items-start">
        <Thumbnail
          thumbnail={item.thumbnail}
          size="square"
          type="full"
          className="bg-neutral-100 rounded-lg w-20 h-20"
        />
        <div className="flex flex-col gap-y-2 justify-between min-h-full self-stretch">
          <div className="flex flex-col">
            <span className="text-neutral-600 text-[0.6rem]">BRAND</span>

            <span className="txt-medium-plus text-neutral-950">
              {item.product_title}
            </span>
            <span className="text-neutral-600 text-xs">
              {item.variant_title}
            </span>
          </div>
          <div className="flex small:flex-row flex-col gap-2">
            <LineItemPrice
              className="flex small:hidden self-start"
              item={item}
              currencyCode={currencyCode}
            />
            <div className="flex gap-x-2">
              <div className="flex gap-x-3 shadow-[0_0_0_1px_rgba(0,0,0,0.1)] rounded-full w-fit p-px items-center">
                <button
                  className={clx(
                    "w-4 h-4 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-full text-md",
                    disabled ? "opacity-50 pointer-events-none" : "opacity-100"
                  )}
                  disabled={item.quantity <= 1 || disabled}
                >
                  -
                </button>
                <span className="w-4 h-4 flex items-center justify-center text-neutral-950 text-xs">
                  <Input
                    className={clx(
                      "w-10 h-4 flex items-center justify-center text-center text-neutral-950 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent shadow-none",
                      disabled
                        ? "opacity-50 pointer-events-none"
                        : "opacity-100"
                    )}
                    type="number"
                    value={quantity}
                    disabled={disabled}
                  />
                </span>
                <button
                  className={clx(
                    "w-4 h-4 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-full text-md",
                    disabled ? "opacity-50 pointer-events-none" : "opacity-100"
                  )}
                  disabled={item.quantity >= maxQuantity || disabled}
                >
                  +
                </button>
              </div>

              <DeleteButton id={item.id} disabled={disabled} />
            </div>
            <AddNoteButton
              item={item as HttpTypes.StoreCartLineItem}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between min-h-full self-stretch">
        <LineItemPrice
          className="hidden small:flex"
          item={item}
          currencyCode={currencyCode}
          style="default"
        />
      </div>
    </Container>
  )
}

export default ItemFull
