import { ICommand } from "../Command/ICommand";
import { IExceptionHandler } from "../ExceptionHandler";
import { IExceptionBase } from "../ExceptionHandler/IExceptionBase";
import {
  IExceptionHandlerContext,
  ExceptionHandlerFn,
} from "../ExceptionHandler/IExceptionHandler";

export class ExceptionHandlerContextCmd implements IExceptionHandlerContext {
  private cmd: ICommand;
  private err: IExceptionBase;
  constructor(newCmd: ICommand, newErr: IExceptionBase) {
    this.cmd = newCmd;
    this.err = newErr;
  }
  getCtx() {
    const { cmd, err } = this;
    return { cmd, err };
  }
}

export class ExceptionHandlerCmd implements IExceptionHandler {
  // пока что пусть будет один обработчик на исключение
  handlers: Map<string, ExceptionHandlerFn> = new Map();
  handle(key: string, ctx: IExceptionHandlerContext): void {
    const handler = this.handlers.get(key);
    // должно быть исклчение или дефолтная обработка ?
    handler?.(ctx);
  }
  register(key: string, cb: ExceptionHandlerFn): void {
    // тут нужны проверки
    this.handlers.set(key, cb);
  }
}
