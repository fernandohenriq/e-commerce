import { AppError } from "../../../shared/errors/app.error"
import { NotFoundError } from "../../../shared/errors/not-found.error"
import { Result } from "../../../shared/result/result"
import { Id } from "../../../shared/value-objects/id"
import { FindProductDTO } from "../domain/dtos/find-product.dto"
import { Product } from "../domain/product.entity"
import { ProductRepo } from "../domain/product.repository"

export class FindByIdProductUsecase {
  constructor(private readonly productRepo: ProductRepo) {}

  async execute(findProductDTO: FindProductDTO): Promise<Result<Product, AppError>> {
    const id = new Id(findProductDTO.id)
    const product = await this.productRepo.findById(id)
    if (product === null || product === undefined) {
      return Result.fail(new NotFoundError(`Product with id ${findProductDTO.id} not found`))
    }
    return Result.ok(product)
  }
}
