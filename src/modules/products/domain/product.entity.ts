import { Result } from "../../../shared/result/result"
import { Id } from "../../../shared/value-objects/id"
import { Name } from "../../../shared/value-objects/name"
import { Numeric } from "../../../shared/value-objects/numeric"
import { CreateProductDTO } from "./dtos/create-product.dto"
import { UpdateProductDTO } from "./dtos/update-product.dto"

export class Product {
  readonly id: Id
  readonly name: Name
  readonly description?: string
  readonly price: Numeric

  constructor(props: PropsOf<Product>) {
    Object.assign(this, props)
  }

  update(input: Omit<UpdateProductDTO, "id">): Result<Product> {
    const price = !!input.price ? Numeric.create(input.price) : Result.ok(this.price)
    const name = !!input.name ? Name.create(input.name) : Result.ok(this.name)
    const errors: any[] = [price, name]
    const results = Result.combine(errors)
    if (results.isFailure()) {
      return Result.fail(results.error)
    }
    return Result.ok(
      new Product({
        id: this.id,
        name: name.value,
        description: input.description,
        price: price.value,
      }),
    )
  }

  static create(input: CreateProductDTO): Result<Product> {
    const price = Numeric.create(input.price)
    const name = Name.create(input.name)
    const errors: any[] = [price, name]
    const results = Result.combine(errors)
    if (results.isFailure()) {
      return Result.fail(results.error)
    }
    return Result.ok(
      new Product({
        id: Id.generate(),
        name: name.value,
        description: input.description,
        price: price.value,
      }),
    )
  }
}
