import { Id } from "../../../shared/value-objects/id"
import { Name } from "../../../shared/value-objects/name"
import { Numeric } from "../../../shared/value-objects/numeric"
import { Price } from "../../../shared/value-objects/price"
import { ProductDTO } from "./dtos/product.dto"
import { Product } from "./product.entity"

export class ProductMapper {
  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id.value,
      name: product.name.value,
      description: product.description,
      price: product.price.value,
    }
  }

  static fromPersistence(props: ProductDTO) {
    return new Product({
      id: new Id(props.id),
      name: new Name(props.name),
      description: props.description,
      price: new Price(props.price),
    })
  }
}
