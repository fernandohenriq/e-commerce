import { beforeEach, describe, expect, test } from "vitest"

import { MemoryDatabase } from "../../../infra/database/memory/memory-database"
import { NotFoundError } from "../../../shared/errors/not-found.error"
import { Product } from "../domain/product.entity"
import { MemoryProductRepo } from "../infra/database/memory-product.repository"
import { UpdateProductUsecase } from "./update-product.usecase"

const memoryDatabase = new MemoryDatabase()
const productRepoMemory = new MemoryProductRepo(memoryDatabase)
const updateProductUsecase = new UpdateProductUsecase(productRepoMemory)

describe("Product Service", () => {
  beforeEach(() => {
    memoryDatabase.set(
      "products",
      new Array(15).fill(0).map((_, index) => ({
        id: `${index + 1}`,
        name: `Product ${index + 1}`,
        description: `Product ${index + 1} description`,
        price: 1.11 * (index + 1),
      })),
    )
  })

  test("Should be able to update a product", async () => {
    const inputId = "1"
    const input = {
      name: "Product",
      description: "Product description",
      price: 999.99,
    }

    const product = (await updateProductUsecase.execute(inputId, input)).value

    expect(product).toBeInstanceOf(Product)
    expect(product.id.value).toBe(inputId)
    expect(product.name.value).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.price.value).toBe(input.price)
  })

  test("Should not be able to update a product", async () => {
    const inputId = "INVALID_ID"
    const input = {
      name: "Product EDITED",
    }

    const error = (await updateProductUsecase.execute(inputId, input)).error as any

    expect(error).toBeInstanceOf(NotFoundError)
    expect(error.message).toBe(`Product with id ${inputId} not found`)
  })
})
