import { CreateProductUsecase } from "../../application/create-product.usecase"
import { FindByIdProductUsecase } from "../../application/find-by-id-product.usecase"
import { FindManyProductUsecase } from "../../application/find-many-product.usecase"
import { UpdateProductUsecase } from "../../application/update-product.usecase"
import { ProductRepo } from "../../domain/product.repository"
import { MemoryProductRepo } from "../database/memory-product.repository"
import { CreateProductController } from "./create-product.controller"
import { FindManyProductController } from "./find-many-product.controller"
import { FindOneProductController } from "./find-one-product.controller"
import { UpdateProductController } from "./update-product.controller"

export class ProductFactory {
  /* OBS: Memory Product Repo only for study purpose, change it for a real prod repo implementation */
  static make(productRepo: ProductRepo = new MemoryProductRepo()) {
    const createProductUsecase = new CreateProductUsecase(productRepo)
    const findByIdProductUsecase = new FindByIdProductUsecase(productRepo)
    const findManyProductUsecase = new FindManyProductUsecase(productRepo)
    const updateProductUsecase = new UpdateProductUsecase(productRepo)
    const createProductController = new CreateProductController(createProductUsecase)
    const findOneProductController = new FindOneProductController(findByIdProductUsecase)
    const findManyProductController = new FindManyProductController(findManyProductUsecase)
    const updateProductController = new UpdateProductController(updateProductUsecase)
    return {
      createProductUsecase,
      findByIdProductUsecase,
      findManyProductUsecase,
      updateProductUsecase,
      createProductController,
      findOneProductController,
      findManyProductController,
      updateProductController,
    }
  }
}
