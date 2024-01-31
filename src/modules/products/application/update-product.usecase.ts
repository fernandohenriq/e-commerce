import { BadRequestError } from "../../../shared/errors/bad-request.error"
import { NotFoundError } from "../../../shared/errors/not-found.error"
import { Result } from "../../../shared/result/result"
import { Id } from "../../../shared/value-objects/id"
import { UpdateProductDTO } from "../domain/dtos/update-product.dto"
import { Product } from "../domain/product.entity"
import { ProductRepo } from "../domain/product.repository"

export class UpdateProductUsecase {
  constructor(private readonly productRepo: ProductRepo) {}

  async execute(id: string, updateProductDTO: UpdateProductDTO): Promise<Result<Product>> {
    const productFound = await this.productRepo.findById(new Id(id))
    if (productFound === null || productFound === undefined) {
      return Result.fail(new NotFoundError(`Product with id ${id} not found`))
    }
    const productUpdatedResult = productFound.update(updateProductDTO)
    if (productUpdatedResult.isFailure()) {
      return Result.fail(new BadRequestError("Error updating product", productUpdatedResult.error))
    }
    const productUpdated = productUpdatedResult.value
    await this.productRepo.save(productUpdated)
    return Result.ok(productUpdated)
  }
}
