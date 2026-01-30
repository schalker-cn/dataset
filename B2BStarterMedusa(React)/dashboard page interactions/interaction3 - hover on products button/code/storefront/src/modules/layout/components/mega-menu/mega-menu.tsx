"use client"

import { HttpTypes } from "@medusajs/types"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const MegaMenu = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const pathname = usePathname()

  const mainCategories = categories.filter(
    (category) => !category.parent_category_id
  )

  let menuTimeout: NodeJS.Timeout | null = null

  const handleMenuHover = () => {
    if (menuTimeout) {
      clearTimeout(menuTimeout)
    }
    setIsHovered(true)
  }

  const handleMenuLeave = () => {
    menuTimeout = setTimeout(() => {
      setIsHovered(false)
    }, 300)

    return () => {
      if (menuTimeout) {
        clearTimeout(menuTimeout)
      }
    }
  }

  useEffect(() => {
    setIsHovered(false)
  }, [pathname])

  return (
    <>
      <div
        onMouseEnter={handleMenuHover}
        onMouseLeave={handleMenuLeave}
        className="z-50"
      >
        <div className="rounded-full px-3 py-2 text-ui-fg-base">
          Products
        </div>
        {isHovered && (
          <div className="fixed left-0 right-0 top-[60px] flex gap-32 py-10 px-20 bg-white border-b border-neutral-200 ">
            <div className="flex flex-col gap-2">
              {mainCategories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-full px-3 py-2 w-fit font-medium text-neutral-900"
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isHovered && (
        <div className="fixed inset-0 mt-[60px] blur-sm backdrop-blur-sm z-[-1]" />
      )}
    </>
  )
}

export default MegaMenu
