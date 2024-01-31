import { Err, Next, Req, Res } from "../../@types/http"

export type HttpCtx<TReq = unknown, TRes = unknown, TNext = unknown, TErr = unknown> = (
  req: Req<TReq>,
  res: Res<TRes>,
  next: Next<TNext>,
  err?: Err<TErr>,
) => void | Promise<void>

export abstract class HttpServer {
  abstract middleware(
    callback: (req: Req, res: Res, next: Next, err?: Err) => Promise<void> | void,
  ): void
  abstract listen(port: number, callback: () => void): void
  abstract get(
    path: string,
    callback: (req: Req, res: Res, next?: Next) => Promise<void> | void,
  ): void
  abstract post(
    path: string,
    callback: (req: Req, res: Res, next?: Next) => Promise<void> | void,
  ): void
  abstract put(
    path: string,
    callback: (req: Req, res: Res, next?: Next) => Promise<void> | void,
  ): void
  abstract patch(
    path: string,
    callback: (req: Req, res: Res, next?: Next) => Promise<void> | void,
  ): void
  abstract delete(
    path: string,
    callback: (req: Req, res: Res, next?: Next) => Promise<void> | void,
  ): void
  abstract options(
    path: string,
    callback: (req: Req, res: Res, next?: Next) => Promise<void> | void,
  ): void
}
