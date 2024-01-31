import { Req, Res } from "../../../../@types/http"
import { FindByIdProductUsecase } from "../../application/find-by-id-product.usecase"
import { ProductMapper } from "../../domain/product.mapper"

export class FindOneProductController {
  constructor(private readonly findByIdProductUsecase: FindByIdProductUsecase) {}

  async execute(req: Req, res: Res) {
    const {
      params: { id },
      auth,
    } = req // TODO: auth
    const result = await this.findByIdProductUsecase.execute({ id })
    if (result.isFailure()) {
      const error = result.error
      return res.status(error.statusCode).json({
        status: error.statusCode,
        statusMessage: error.statusMessage,
        message: error.message,
        error: error.error,
      })
    }
    res.status(200).json({
      message: "Product found successfully",
      data: ProductMapper.toDTO(result.value),
    })
  }
}
