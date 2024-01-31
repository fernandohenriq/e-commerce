import express, { NextFunction, Request, Response } from "express"

import { Err, Next, Req, Res } from "../../../@types/http"
import { HttpCtx, HttpServer } from "../http.server"

type ExpressHttpCtx = HttpCtx<Request, Response, NextFunction, any>

export class ExpressHttpServerAdapter implements HttpServer {
  private app: express.Application

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  post(path: string, callback: ExpressHttpCtx): void {
    this.app.post(path, callback)
  }

  get(path: string, callback: ExpressHttpCtx): void {
    this.app.get(path, callback)
  }

  put(path: string, callback: ExpressHttpCtx): void {
    this.app.put(path, callback)
  }

  patch(path: string, callback: ExpressHttpCtx): void {
    this.app.patch(path, callback)
  }

  delete(path: string, callback: ExpressHttpCtx): void {
    this.app.delete(path, callback)
  }

  options(path: string, callback: ExpressHttpCtx): void {
    this.app.options(path, callback)
  }

  middleware(callback: ExpressHttpCtx): void {
    if (callback.length >= 4) {
      this.app.use((err: Err<any>, req: Req<any>, res: Res<any>, next: Next<NextFunction>) =>
        callback(req, res, next, err),
      )
      return
    }
    this.app.use((req: Req<any>, res: Res<any>, next: Next<NextFunction>) =>
      callback(req, res, next),
    )
  }

  listen(port: number, callback?: () => void): void {
    this.app.listen(port, callback)
  }
}
