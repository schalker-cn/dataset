import createCompanyMock from "@/mocks/company/CREATE_COMPANY_MOCK.json"
import customerDetailMock from "@/mocks/store/CUSTOMER_DETAIL_MOCK.json"
import productListMock from "@/mocks/store/PRODUCT_LIST_MOCK.json"
import retrieveCartMock from "@/mocks/cart/RETRIEVE_CART_MOCK.json"
import categoryMock from "@/mocks/store/CATEGORY_MOCK.json"
import collectionMock from "@/mocks/store/COLLECTION_MOCK.json";
import regionMock from "@/mocks/store/REGION_MOCK.json";
import { StoreProductCategory } from "@medusajs/types";



// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

// set image placeholder
const DUMMY_THUMBNAIL = "https://dummyimage.com/1080x1080/0606fc/0606fc&text=1"

retrieveCartMock.cart = {
  ...retrieveCartMock.cart,
  items: retrieveCartMock.cart.items.map((item) => ({
    ...item,
    thumbnail: DUMMY_THUMBNAIL,
  })),
}
productListMock.products = productListMock.products.map((product) => ({
  ...product,

  thumbnail: DUMMY_THUMBNAIL,

  images: product.images.map((image) => ({
    ...image,
    url: DUMMY_THUMBNAIL,
  })),
}))

export const sdkMock = {
  store: {
    product: {
      list: async (query: any = {}, _headers: any = {}) => {
        console.log("[MOCK SDK] store.product.list called")
        console.log("query:", query)

        await new Promise((resolve) => setTimeout(resolve, 100))
        return {
          products: productListMock.products,
          count: productListMock.count,
          offset: productListMock.offset,
          limit: productListMock.limit,
        }
      }
    },
    cart: {
      update: async (
        cartId: string,
        data: any,
        _query = {},
        _headers = {}
      ) => {
        console.log("[MOCK SDK] store.cart.update called")
        console.log("cartId:", cartId)
        console.log("data:", data)

        await new Promise((resolve) => setTimeout(resolve, 100))

        const originalCart = retrieveCartMock.cart

        if (originalCart.id !== cartId) {
          console.warn(
            `[MOCK SDK] Warning: Requested cartId=${cartId} but only mock cartId=${originalCart.id}`
          )
        }

        const updatedCart = {
          ...originalCart,
          ...data,
        }

        retrieveCartMock.cart = updatedCart

        return {
          cart: updatedCart,
        }
      },
      createLineItem: async (
        cartId: string,
        body: { variant_id: string; quantity: number; metadata?: any },
        _query: any = {},
        _headers: any = {}
      ) => {
        console.log("[MOCK SDK] store.cart.createLineItem called")
        console.log("cartId:", cartId)
        console.log("body:", body)

        await new Promise((resolve) => setTimeout(resolve, 100))

        const cart = retrieveCartMock.cart
        if (!cart.items) cart.items = []

        const existing = cart.items.find(
          (item: any) => item.variant_id === body.variant_id
        )
        if (existing) {
          // product already exists
          existing.quantity += body.quantity
          existing.updated_at = new Date().toISOString()
        } else {
          // 1. fetch product by variant_id
          const product = productListMock.products.find((p: any) =>
            p.variants?.some((v: any) => v.id === body.variant_id)
          )

          if (!product) {
            throw new Error(`Product not found for variant_id: ${body.variant_id}`)
          }

          const variant = product.variants.find(
            (v: any) => v.id === body.variant_id
          )

          if (!variant) {
            throw new Error(`Variant not found: ${body.variant_id}`)
          }

          const now = new Date().toISOString()

          // 2. construct cart item
          const lineItem = {
            // generate dummy id
            id: `cali_${Math.random().toString(36).slice(2)}`,

            thumbnail: product.thumbnail ?? null,

            variant_id: variant.id,
            product_id: product.id,
            product_type_id: product.type_id ?? null,

            product_title: product.title,
            product_description: product.description,
            product_subtitle: product.subtitle ?? null,
            product_type: null,
            product_collection: product.collection?.title ?? "Uncategorized",
            product_handle: product.handle,

            variant_sku: variant.sku,
            variant_barcode: variant.barcode ?? null,
            variant_title: variant.title,

            requires_shipping: false,
            metadata: body.metadata ?? {},

            created_at: now,
            updated_at: now,

            title: product.title,

            quantity: body.quantity,
            unit_price: variant.calculated_price?.original_amount ?? 100,
            compare_at_unit_price: null,
            is_tax_inclusive: false,

            tax_lines: [],
            adjustments: [],

            product: {
              id: product.id,
              collection_id: product.collection_id ?? "pcol_defaultCollection",
              type_id: product.type_id ?? null,
              categories: [],
              tags: product.tags ?? []
            }
          }

          cart.items.push(lineItem)
        }

        const subtotal = cart.items.reduce(
          (sum: number, item: any) => sum + item.unit_price * item.quantity,
          0
        )

        cart.item_subtotal = subtotal
        cart.item_total = subtotal
        cart.subtotal = subtotal
        cart.total = subtotal

        retrieveCartMock.cart = cart
        return { cart }
      },
      updateLineItem: async (
        cartId: string,
        lineItemId: string,
        body: any = {},
        _query: any = {},
        headers: any = {}
      ) => {
        console.log("[MOCK SDK] store.cart.updateLineItem called")
        console.log("cartId:", cartId)
        console.log("lineItemId:", lineItemId)
        console.log("body:", body)
        console.log("headers:", headers)

        await new Promise((resolve) => setTimeout(resolve, 100))

        const cart = retrieveCartMock.cart

        if (!cart) {
          throw new Error("Mock cart not initialized")
        }

        const itemIndex = cart.items.findIndex((item) => item.id === lineItemId)

        if (itemIndex === -1) {
          throw new Error(`Line item ${lineItemId} not found`)
        }

        // update lineItem
        const updatedItem = {
          ...cart.items[itemIndex],
          ...body, // { quantity: X }
          total: cart.items[itemIndex].unit_price * (body.quantity ?? cart.items[itemIndex].quantity),
          original_total: cart.items[itemIndex].unit_price * (body.quantity ?? cart.items[itemIndex].quantity),
          updated_at: new Date().toISOString(),
        }

        cart.items[itemIndex] = updatedItem

        // calculate new subtotal
        const newSubtotal = cart.items.reduce((sum, item) => {
          return sum + item.unit_price * item.quantity
        }, 0)
        cart.item_subtotal = newSubtotal
        cart.item_total = newSubtotal
        cart.subtotal = newSubtotal
        cart.total = newSubtotal

        retrieveCartMock.cart = cart

        return { cart }
      },
      deleteLineItem: async (
        cartId: string,
        lineItemId: string,
        headers: any = {}
      ) => {
        console.log("[MOCK SDK] store.cart.deleteLineItem called")
        console.log("cartId:", cartId)
        console.log("lineItemId:", lineItemId)
        console.log("headers:", headers)

        await new Promise((resolve) => setTimeout(resolve, 100))

        const cart = retrieveCartMock.cart

        if (!cart) {
          throw new Error("Mock cart not initialized")
        }

        const itemIndex = cart.items.findIndex((item) => item.id === lineItemId)

        if (itemIndex === -1) {
          throw new Error(`Line item ${lineItemId} not found`)
        }
        cart.items.splice(itemIndex, 1)

        // calculate new subtotal
        const newSubtotal = cart.items.reduce((sum, item) => {
          return sum + item.unit_price * item.quantity
        }, 0)
        cart.item_subtotal = newSubtotal
        cart.item_total = newSubtotal
        cart.subtotal = newSubtotal
        cart.total = newSubtotal

        retrieveCartMock.cart = cart

        return {
          id: lineItemId,
          object: "line-item",
          deleted: true,
          parent: cart,
        }
      }


    },
  },

  client: {

    // -> storefront/src/lib/data/companies.ts/retrieveCompany function
    retrieveCompany: async (companyId: string) => {
      return createCompanyMock.response.companies[0]
    },

    // -> storefront/src/lib/data/customer.ts/retrieveCustomer function
    retrieveCustomer: async (headers: any = {}) => {
        console.log("[MOCK SDK] client.retrieveCustomer called")
        console.log("headers:", headers)
        await new Promise((resolve) => setTimeout(resolve, 100))

        return customerDetailMock.customer
    },

    // -> storefront/src/lib/data/cart.ts/retrieveCart function
    retrieveCart: async (cartId: string, headers: any = {}) => {
      console.log("[MOCK SDK] client.fetch.retrieveCart called")
      console.log("cartId:", cartId)
      console.log("headers:", headers)

      await new Promise((resolve) => setTimeout(resolve, 100))
      return retrieveCartMock
    },

    // -> storefront/src/lib/data/categories.ts/listCategories function
    listCategories: async (query: any = {}) => {
      console.log("[MOCK SDK] client.listCategories called")
      console.log("query:", query)

      await new Promise((resolve) => setTimeout(resolve, 100))

      const limit = query?.limit ?? categoryMock.product_categories.length

      // only used for mock
      return categoryMock.product_categories.slice(0, limit) as unknown as StoreProductCategory[]
    },

    // storefront/src/lib/data/collections.ts/listCollections function
    listCollections: async (queryParams: Record<string, string> = {}) => {
      console.log("[MOCK SDK] client.listCollections called")
      console.log("queryParams:", queryParams)

      await new Promise((resolve) => setTimeout(resolve, 100))

      const limit = Number(queryParams.limit ?? "100")
      const offset = Number(queryParams.offset ?? "0")

      const collections = collectionMock.collections.slice(
        offset,
        offset + limit
      )

      return {
        collections,
        count: collections.length,
      }
    },

    // storefront/src/lib/data/products.ts/getProductsById function
    getProductsById: async ({
      ids,
      regionId,
    }: {
      ids: string[]
      regionId: string
    }) => {
      console.log("[MOCK SDK] client.getProductsById called")
      console.log("ids:", ids)

      await new Promise((resolve) => setTimeout(resolve, 100))

      const products = productListMock.products.filter((p: any) =>
        ids.includes(p.id)
      )

      return products
    },    

    // storefront/src/lib/data/products.ts/getProductByHandle function
    getProductByHandle: async (handle: string, _regionId: string) => {
      console.log("[MOCK SDK] client.getProductByHandle called")
      console.log("handle:", handle)

      await new Promise((resolve) => setTimeout(resolve, 100))

      const product = productListMock.products.find(
        (p: any) => p.handle === handle
      )

      if (!product) {
        throw new Error(`Product not found for handle: ${handle}`)
      }

      return product
    },

    // storefront/src/lib/data/products.ts/listProducts function
    listProducts: async(limit: number, offset:number) => {
      console.log("[MOCK SDK] fetchProducts called")
      console.log("limit:", limit, "offset:", offset)

      await new Promise((resolve) => setTimeout(resolve, 100))

      const allProducts = productListMock.products
      const count = productListMock.count ?? allProducts.length

      const products = allProducts.slice(offset, offset + limit)

      return {
        products,
        count,
      }
    },

    // storefront/src/lib/data/regions.ts/listRegions function
    listRegions: async () => {
      console.log("[MOCK SDK] client.listRegions called")

      await new Promise((resolve) => setTimeout(resolve, 100))

      return regionMock.regions
    },
  },
}