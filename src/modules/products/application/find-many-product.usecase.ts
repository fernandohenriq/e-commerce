import { AppError } from "../../../shared/errors/app.error"
import { Result } from "../../../shared/result/result"
import { Product } from "../domain/product.entity"
import { ProductRepo } from "../domain/product.repository"

export class FindManyProductUsecase {
  constructor(private readonly productRepo: ProductRepo) {}

  async execute(search?: Search<Product>): Promise<Result<Product[], AppError>> {
    const products =
      (await this.productRepo.findBy({
        page: search?.page ?? 1,
        limit: search?.limit ?? 10,
        sort: search?.sort ?? "asc",
        orderBy: search?.orderBy ?? "name",
        where: search?.where ?? {},
      })) ?? []
    return Result.ok(products)
  }
}
