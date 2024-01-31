import { beforeEach, describe, expect, test } from "vitest"

import { MemoryDatabase } from "../../../shared/memory/memory-database"
import { Product } from "../domain/product.entity"
import { MemoryProductRepo } from "../infra/database/memory-product.repository"
import { FindManyProductUsecase } from "./find-many-product.usecase"

const memoryDatabase = new MemoryDatabase()
const productRepoMemory = new MemoryProductRepo(memoryDatabase)
const findManyProductUsecase = new FindManyProductUsecase(productRepoMemory)

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

  test("Should be able to search for product(s)", async () => {
    const products = (
      await findManyProductUsecase.execute({
        page: 1,
        limit: 5,
        sort: "asc",
        orderBy: "name",
        where: { name: "Product " },
      })
    ).value

    expect(products).toHaveLength(5)
    expect(products[0]).toBeInstanceOf(Product)
    expect(products[0].id.value).toBe("1")
    expect(products[0].name.value).toBe("Product 1")
  })

  test("Should not be able to search for any product(s)", async () => {
    const products = (
      await findManyProductUsecase.execute({
        page: 1,
        limit: 5,
        sort: "asc",
        orderBy: "name",
        where: { name: "Product 100" },
      })
    ).value

    expect(products).toBeInstanceOf(Array)
    expect(products).toHaveLength(0)
  })
})
