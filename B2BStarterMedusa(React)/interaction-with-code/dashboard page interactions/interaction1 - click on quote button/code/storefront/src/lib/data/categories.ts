"use server"

import { HttpTypes } from "@medusajs/types"
import { sdkMock } from "../mockConfig"

export const listCategories = async (
  query?: Record<string, any>
): Promise<HttpTypes.StoreProductCategory[]> => {
  const limit = query?.limit || 100

  return sdkMock.client.listCategories({
    limit,
    ...query,
  })
}
