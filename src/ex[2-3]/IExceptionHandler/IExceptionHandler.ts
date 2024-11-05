export interface IExceptionHandlerContext {
  err: Error;
  getCtx(): unknown;
  getKey(): string;
}
export type ExceptionHandlerFn = (ctx: IExceptionHandlerContext) => void;
export interface IExceptionHandler {
  register(key: string, cb: ExceptionHandlerFn): void;
  handle(ctx: IExceptionHandlerContext): void;
}
