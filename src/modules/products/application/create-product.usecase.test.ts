import { beforeEach, describe, expect, test } from "vitest"

import { MemoryDatabase } from "../../../infra/database/memory/memory-database"
import { BadRequestError } from "../../../shared/errors/bad-request.error"
import { Name } from "../../../shared/value-objects/name"
import { Price } from "../../../shared/value-objects/price"
import { Product } from "../domain/product.entity"
import { MemoryProductRepo } from "../infra/database/memory-product.repository"
import { CreateProductUsecase } from "./create-product.usecase"

const memoryDatabase = new MemoryDatabase()
const productRepoMemory = new MemoryProductRepo(memoryDatabase)
const createProductUsecase = new CreateProductUsecase(productRepoMemory)

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

  test("Should be able to create a product", async () => {
    const input = {
      name: "Product",
      description: "Product description",
      price: 999.99,
    }

    const product = (await createProductUsecase.execute(input)).value

    expect(product).toBeInstanceOf(Product)
    expect(product.name.value).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.price.value).toBe(input.price)
  })

  test("Should not be able to create a product", async () => {
    const input = {
      name: "Pr", // Invalid name
      description: "Product description",
      // Missing price
    } as any

    const error = (await createProductUsecase.execute(input)).error as any

    expect(error).toBeInstanceOf(BadRequestError)
    expect(error.message).toBe("Error creating product")
    expect(error.error).toContain(Price.errorMessage)
    expect(error.error).toContain(Name.errorMessage)
  })
})
