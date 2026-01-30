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

  useEffect(() => {
    setIsHovered(false)
  }, [pathname])

  return (
    <>
      <div
        className="z-50"
      >
        <div className="rounded-full px-3 py-2 text-ui-fg-base">
          Products
        </div>
      </div>
    </>
  )
}

export default MegaMenu
