"use server"

import { B2BCustomer } from "@/types/global"
import {
  getAuthHeaders,
  getCartId,
} from "./cookies"
import { sdkMock } from "../mockConfig"

export const retrieveCustomer = async (): Promise<B2BCustomer | null> => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return null

  const headers = {
    ...authHeaders,
  }

  return await sdkMock.client.retrieveCustomer(headers) as unknown as B2BCustomer
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  // no need to transfer cart as using mock

  // const headers = {
  //   ...(await getAuthHeaders()),
  // }

  // await sdk.store.cart.transferCart(cartId, {}, headers)

  // const cartCacheTag = await getCacheTag("carts")

  // revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (
  _currentState: unknown,
  formData: FormData
): Promise<any> => {
  return { success: true, error: null }
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<any> => {
  return { success: true, error: null }
}
