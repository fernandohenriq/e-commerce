import { Req, Res } from "../../../../@types/http"
import { FindByIdProductUsecase } from "../../application/find-by-id-product.usecase"
import { UpdateProductUsecase } from "../../application/update-product.usecase"
import { ProductMapper } from "../../domain/product.mapper"

export class UpdateProductController {
  constructor(private readonly updateProductUsecase: UpdateProductUsecase) {}

  async execute(req: Req, res: Res) {
    const {
      params: { id },
      body: data,
      auth,
    } = req // TODO: auth
    const result = await this.updateProductUsecase.execute(id, data)
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
      message: "Product updated successfully",
      data: ProductMapper.toDTO(result.value),
    })
  }
}
