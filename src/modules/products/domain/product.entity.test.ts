import { beforeAll, beforeEach, describe, expect, test } from "vitest"

import { Id } from "../../../shared/value-objects/id"
import { Name } from "../../../shared/value-objects/name"
import { Numeric } from "../../../shared/value-objects/numeric"
import { CreateProductDTO } from "./dtos/create-product.dto"
import { Product } from "./product.entity"

describe("Product Entity", () => {
  test("Should be able to instantiate a product entity", async () => {
    const input = {
      id: Id.generate(),
      name: new Name("Product"),
      description: "Product description",
      price: new Numeric(999.99),
    }

    const product = new Product(input)

    expect(product).toBeInstanceOf(Product)
    expect(product.id.value).toBe(input.id.value)
    expect(product.name.value).toBe(input.name.value)
    expect(product.description).toBe(input.description)
    expect(product.price.value).toBe(input.price.value)
  })

  test("Should be able to create a product", async () => {
    const input: CreateProductDTO = {
      name: "Product",
      description: "Product description",
      price: 999.99,
    }

    const product = Product.create(input).value

    expect(product).toBeInstanceOf(Product)
    expect(product.name.value).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.price.value).toBe(input.price)
  })

  test("Should be able to update a product", async () => {
    const input = {
      name: "Product EDITED",
    }

    const product = Product.create({
      name: "Product",
      description: "Product description",
      price: 999.99,
    }).value

    const updatedProduct = product.update(input).value

    expect(updatedProduct).toBeInstanceOf(Product)
    expect(updatedProduct.name.value).toBe(input.name)
  })
})
