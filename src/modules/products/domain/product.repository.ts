import { Id } from "../../../shared/value-objects/id"
import { Product } from "./product.entity"

export abstract class ProductRepo {
  abstract save(product: Product): Promise<Product>
  abstract findById(id: Id): Promise<Product | null>
  abstract findBy(search?: Search<Product>): Promise<Product[]>
}
