"use server"

import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import { sdkMock } from "../mockConfig"

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return sdkMock.client.listCollections(queryParams)
}
