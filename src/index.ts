import { ExpressHttpServerAdapter } from "./infra/http/express/express-http.server.adapter"
import { HttpServer } from "./infra/http/http.server"
import { ProductFactory } from "./modules/products/infra/controllers/product.factory"
import { Logger } from "./shared/logger/logger"

const PORT = +process.env.PORT || 3000
const HOST = process.env.HOST || "http://localhost"

// Dependencies
const {
  createProductController,
  findOneProductController,
  findManyProductController,
  updateProductController,
} = ProductFactory.make()

// Server instance
const httpServer: HttpServer = new ExpressHttpServerAdapter()

// Routes
httpServer.options("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>`)
})

httpServer.post("/products", createProductController.execute.bind(createProductController))

httpServer.get("/products/:id", findOneProductController.execute.bind(findOneProductController))

httpServer.get("/products", findManyProductController.execute.bind(findManyProductController))

httpServer.patch("/products/:id", updateProductController.execute.bind(updateProductController))

// After middlewares
httpServer.middleware((req, res, next, err) => {
  if (!!err) {
    res.status(500).json({
      status: 500,
      statusMessage: "internal_server_error",
      message: err?.message ?? "Internal server error",
      error: err,
    })
  }
  next()
})

httpServer.middleware((req, res, next) => {
  res.status(404).json({
    status: 404,
    statusMessage: "not_found",
    message: "Route not found",
  })
})

// Start server
httpServer.listen(PORT, () => {
  Logger.info(`Server running on port ${HOST}:${PORT}`)
})
