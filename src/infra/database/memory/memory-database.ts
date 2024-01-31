type Data = {
  [field: string]: any
}
type Table = string
type Column = Record<string, any>
type Search<T> = {
  page?: number
  limit?: number
  sort?: "asc" | "desc"
  orderBy?: keyof T
  [key: string]: any
}

export class MemoryDatabase {
  private db = new Map<Table, Column[]>()

  drop(table: Table): void {
    this.db.delete(table)
  }

  clear(): void {
    this.db.clear()
  }

  set<T extends Column>(table: Table, data: T[]): void {
    this.db.set(table, data)
  }

  async getIndex(table: Table): Promise<number> {
    return this.db.get(table)?.length ?? 0
  }

  async create<T extends Data = any>(table: Table, data: T): Promise<T> {
    if (!this.db.has(table)) {
      this.db.set(table, [])
    }
    const tableData = (this.db.get(table) ?? []) as Data[]
    data = { ...data, id: data?.id ?? (await this.getIndex(table)) + 1 }
    tableData.push(data)
    this.db.set(table, tableData)
    return data
  }

  async findBy<T = unknown>(table: Table, key: keyof T, value: any): Promise<T | null> {
    const tableData = (this.db.get(table) ?? []) as T[]
    return tableData.find((row) => row[key] === value) ?? null
  }

  async findWhere<T = unknown>(table: Table, where: Partial<T | Record<string, any>>): Promise<T[] | null> {
    const tableData = (this.db.get(table) ?? []) as T[]
    return tableData.filter((row) => {
      return Object.entries(where ?? {}).every(([key, value]) => {
        return row[key as keyof T] === value
      })
    })
  }

  async findMany<T = unknown>(table: Table, search?: Search<T>): Promise<T[]> {
    const { page = 1, limit = 100, sort = "asc", orderBy = "", ...where } = search ?? {}
    const tableData = (this.db.get(table) ?? []) as T[]
    return tableData
      .filter((row) => {
        return Object.entries(where ?? {}).every(([key, value]) => {
          return row[key as keyof T] === value
        })
      })
      .slice((page - 1) * limit, page * limit)
      .sort((a, b) => {
        if (sort === "asc") {
          // @ts-ignore
          return a[orderBy] - b[orderBy]
        } else {
          // @ts-ignore
          return b[orderBy] - a[orderBy]
        }
      })
  }

  async update<T = unknown>(table: Table, key: keyof T, value: any, newData: T): Promise<T | null> {
    const tableData = (this.db.get(table) ?? []) as T[]
    const index = tableData.findIndex((row) => row[key] === value)
    if (index !== -1) {
      tableData[index] = { ...tableData[index], ...newData }
      this.db.set(table, tableData)
      return tableData[index]
    }
    return null
  }

  async delete<T = unknown>(table: Table, key: keyof T, value: any): Promise<boolean> {
    const tableData = (this.db.get(table) ?? []) as T[]
    const index = tableData.findIndex((row) => row[key] === value)
    if (index !== -1) {
      tableData.splice(index, 1)
      this.db.set(table, tableData)
      return true
    }
    return false
  }
}
