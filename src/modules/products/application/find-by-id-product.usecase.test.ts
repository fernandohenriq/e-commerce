import { beforeEach, describe, expect, test } from "vitest"

import { MemoryDatabase } from "../../../infra/database/memory/memory-database"
import { NotFoundError } from "../../../shared/errors/not-found.error"
import { Product } from "../domain/product.entity"
import { MemoryProductRepo } from "../infra/database/memory-product.repository"
import { FindByIdProductUsecase } from "./find-by-id-product.usecase"

const memoryDatabase = new MemoryDatabase()
const productRepoMemory = new MemoryProductRepo(memoryDatabase)
const findByIdProductUsecase = new FindByIdProductUsecase(productRepoMemory)

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

  test("Should be able to get a product by id", async () => {
    const input = { id: "1" }

    const product = (await findByIdProductUsecase.execute(input)).value

    expect(product).toBeInstanceOf(Product)
  })

  test("Should not be able to get a product by id", async () => {
    const input = { id: "INVALID_ID" }

    const error = (await findByIdProductUsecase.execute(input)).error as any
    expect(error).toBeInstanceOf(NotFoundError)
    expect(error.message).toBe(`Product not found with id: ${input.id}`)
  })
})
