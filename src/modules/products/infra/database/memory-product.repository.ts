import { MemoryDatabase } from "../../../../shared/memory/memory-database"
import { Id } from "../../../../shared/value-objects/id"
import { Product } from "../../domain/product.entity"
import { ProductMapper } from "../../domain/product.mapper"
import { ProductRepo } from "../../domain/product.repository"

export class MemoryProductRepo implements ProductRepo {
  constructor(public db = new MemoryDatabase()) {}

  async save(product: Product): Promise<Product> {
    const data = ProductMapper.toDTO(product)
    const alreadyExists = !!this.db.findBy("products", "id", data.id)
    if (alreadyExists) {
      await this.db.create("products", data)
      return product
    }
    await this.db.update("products", "id", data.id, data)
    return product
  }

  async findById({ value: id }: Id) {
    const data = await this.db.findBy<any>("products", "id", id)
    if (!data) return null
    return ProductMapper.fromPersistence(data)
  }

  async findBy(search: Search<Product>): Promise<Product[]> {
    const table = await this.db.findMany<any[]>("products")
    let filteredData = [...table]
    if (search.where) {
      filteredData = filteredData.filter((item) => {
        for (const key in search.where) {
          if (!String(item[key]).toLowerCase().includes(String(search.where[key]).toLowerCase())) {
            return false
          }
        }
        return true
      })
    }
    if (search.sort && search.orderBy) {
      filteredData.sort((a, b) => {
        const valueA = a[search.orderBy]
        const valueB = b[search.orderBy]
        if (valueA === valueB) {
          return 0
        }
        if (search.sort === "asc") {
          return valueA < valueB ? -1 : 1
        } else {
          return valueA > valueB ? -1 : 1
        }
      })
    }
    const startIndex = (search.page - 1) * search.limit
    const endIndex = startIndex + search.limit
    return filteredData
      .slice(startIndex, endIndex)
      .map((product: any) => ProductMapper.fromPersistence(product))
  }
}
