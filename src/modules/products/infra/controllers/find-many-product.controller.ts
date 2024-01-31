import { Req, Res } from "../../../../@types/http"
import { FindManyProductUsecase } from "../../application/find-many-product.usecase"
import { ProductMapper } from "../../domain/product.mapper"

export class FindManyProductController {
  constructor(private readonly findManyProductUsecase: FindManyProductUsecase) {}

  async execute(req: Req, res: Res) {
    const { query: search, auth } = req // TODO: auth
    const result = await this.findManyProductUsecase.execute(search)
    if (result.isFailure()) {
      const error = result.error
      return res.status(error.statusCode).json({
        status: error.statusCode,
        statusMessage: error.statusMessage,
        message: error.message,
        error: error.error,
      })
    }
    const products = result.value
    return res.status(200).json({
      message: "Products found successfully",
      query: search,
      data: products.map(ProductMapper.toDTO),
    })
  }
}
