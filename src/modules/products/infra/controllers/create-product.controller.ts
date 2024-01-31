import { Req, Res } from "../../../../@types/http"
import { CreateProductUsecase } from "../../application/create-product.usecase"
import { ProductMapper } from "../../domain/product.mapper"

export class CreateProductController {
  constructor(private readonly createProductUsecase: CreateProductUsecase) {}

  async execute(req: Req, res: Res) {
    const { body: data, auth } = req // TODO: auth
    const result = await this.createProductUsecase.execute(data)
    if (result.isFailure()) {
      const error = result.error
      return res.status(error.statusCode).json({
        status: error.statusCode,
        statusMessage: error.statusMessage,
        message: error.message,
        error: error.error,
      })
    }
    return res.status(201).json({
      message: "Product created successfully",
      data: ProductMapper.toDTO(result.value),
    })
  }
}
