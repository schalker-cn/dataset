"use server"

import { sdkMock } from "@/lib/mockConfig"
import medusaError from "@/lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import {
  getAuthHeaders,
  getCacheTag,
  getCartId,
  setCartId,
} from "./cookies"

export async function retrieveCart(id?: string) {
  const cartId = id || "cart_01KC12B6BV4VQGWBY5T94SNJ68"

  const headers = {
    ...(await getAuthHeaders()),
  }

  const { cart } = await sdkMock.client.retrieveCart(cartId, headers)

  return cart
}


export async function getOrSetCart(countryCode: string) {
  const cart = await retrieveCart()
  setCartId(cart.id)

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
  return cart
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdkMock.store.cart
    .update(cartId, data, {}, headers)
    .then(async ({ cart }) => {
      const fullfillmentCacheTag = await getCacheTag("fulfillment")
      revalidateTag(fullfillmentCacheTag)
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
      return cart
    })
    .catch(medusaError)
}

export async function addToCartBulk({
  lineItems,
  countryCode,
}: {
  lineItems: HttpTypes.StoreAddCartLineItem[]
  countryCode: string
}) {
  const cart = await getOrSetCart(countryCode)

  const headers = {
    ...(await getAuthHeaders()),
  }

  for (const item of lineItems) {
    await sdkMock.store.cart.createLineItem(
      cart.id,
      {
        variant_id: item.variant_id,
        quantity: item.quantity,
      },
      {},
      headers,
    )
  }

  const fullfillmentCacheTag = await getCacheTag("fulfillment")
  const cartCacheTag = await getCacheTag("carts")

  revalidateTag(fullfillmentCacheTag)
  revalidateTag(cartCacheTag)
}

export async function updateLineItem({
  lineId,
  data,
}: {
  lineId: string
  data: HttpTypes.StoreUpdateCartLineItem
}) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdkMock.store.cart
    .updateLineItem(cartId, lineId, data, {}, headers)
    .then(async () => {
      const fullfillmentCacheTag = await getCacheTag("fulfillment")
      revalidateTag(fullfillmentCacheTag)
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item")
  }

  const cartId = await getCartId()
  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdkMock.store.cart
    .deleteLineItem(cartId, lineId, headers)
    .then(async () => {
      const fullfillmentCacheTag = await getCacheTag("fulfillment")
      revalidateTag(fullfillmentCacheTag)
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)
    })
    .catch(medusaError)
}

export async function emptyCart() {
  const cart = await retrieveCart()
  if (!cart) {
    throw new Error("No existing cart found when emptying cart")
  }

  for (const item of cart.items || []) {
    await deleteLineItem(item.id)
  }

  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}
