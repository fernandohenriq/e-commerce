import { BadRequestError } from "../../../shared/errors/bad-request.error"
import { Result } from "../../../shared/result/result"
import { CreateProductDTO } from "../domain/dtos/create-product.dto"
import { Product } from "../domain/product.entity"
import { ProductRepo } from "../domain/product.repository"

export class CreateProductUsecase {
  constructor(private readonly productRepo: ProductRepo) {}

  async execute(createProductDto: CreateProductDTO): Promise<Result<Product, BadRequestError>> {
    const productResult = Product.create(createProductDto)
    if (productResult.isFailure()) {
      return Result.fail(new BadRequestError("Error creating product", productResult.error))
    }
    const product = productResult.value
    await this.productRepo.save(product)
    return Result.ok(product)
  }
}
