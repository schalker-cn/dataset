import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  // TODO: Fix image typings
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  type?: "preview" | "full"
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
  type,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clx("relative w-full overflow-hidden", className, {
        "aspect-[11/14]": isFeatured,
        "aspect-[9/16]": !isFeatured && size !== "square",
        "aspect-[1/1]": size === "square",
        "w-[180px]": size === "small",
        "w-[290px]": size === "medium",
        "w-[440px]": size === "large",
        "w-full": size === "full",
      })}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} type={type} />
    </div>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
  type,
}: Pick<ThumbnailProps, "size" | "type"> & {
  image?: string
}) => {
  return (    
    <Image
      src={image? image : "dummy image"}
      alt="Thumbnail"
      className={clx("absolute inset-0 object-contain", {
        "p-4": type === "full",
        "p-2": type === "preview",
      })}
      draggable={false}
      quality={50}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />)
}

export default Thumbnail
