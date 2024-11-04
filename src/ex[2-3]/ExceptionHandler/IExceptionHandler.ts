export interface IExceptionHandlerContext {
  getCtx(): unknown;
}
export type ExceptionHandlerFn = (ctx: IExceptionHandlerContext) => void;
export interface IExceptionHandler {
  register(key: string, cb: ExceptionHandlerFn): void;
  handle(key: string, ctx: IExceptionHandlerContext): void;
}
