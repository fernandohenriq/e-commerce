import { describe, expect, test } from "vitest"

import { ProductDTO } from "./dtos/product.dto"
import { Product } from "./product.entity"
import { ProductMapper } from "./product.mapper"

describe("ProductMapper", () => {
  test("Should be able to map product dto to entity", async () => {
    const input: ProductDTO = {
      id: "123",
      name: "Product",
      description: "Product description",
      price: 999.99,
    }

    const product = ProductMapper.fromPersistence(input)

    expect(product).toBeInstanceOf(Product)
    expect(product.id.value).toBe(input.id)
    expect(product.name.value).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.price.value).toBe(input.price)
  })

  test("Should be able to map product entity to dto", async () => {
    const productEntity = Product.create({
      name: "Product",
      description: "Product description",
      price: 999.99,
    }).value

    const productDTO = ProductMapper.toDTO(productEntity)

    expect(productDTO).not.toBeInstanceOf(Product)
    expect(productDTO.id).toBe(productEntity.id.value)
    expect(productDTO.name).toBe(productEntity.name.value)
    expect(productDTO.description).toBe(productEntity.description)
    expect(productDTO.price).toBe(productEntity.price.value)
  })
})
