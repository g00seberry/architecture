import { ICommand } from "../Command";
import { IExceptionHandler } from "../ExceptionHandler";
import { IExceptionBase } from "../ExceptionHandler/IExceptionBase";
import {
  IExceptionHandlerContext,
  ExceptionHandlerFn,
} from "../ExceptionHandler/IExceptionHandler";
import { makeExceptionHandlerCmdKey } from "./getExceptionHandlerCmd";

export class ExceptionHandlerContextCmd implements IExceptionHandlerContext {
  cmd: ICommand;
  err: IExceptionBase;
  constructor(newCmd: ICommand, newErr: IExceptionBase) {
    this.cmd = newCmd;
    this.err = newErr;
  }
  getCtx() {
    const { cmd, err } = this;
    return { cmd, err };
  }
}

export const makeExceptionHadlerContextCmd = (
  newCmd: ICommand,
  newErr: IExceptionBase
) => new ExceptionHandlerContextCmd(newCmd, newErr);

export class ExceptionHandlerCmd implements IExceptionHandler {
  // пока что пусть будет один обработчик на исключение
  handlers: Map<string, ExceptionHandlerFn> = new Map();
  handle(ctx: ExceptionHandlerContextCmd): void {
    const { cmd, err } = ctx.getCtx();
    const key = makeExceptionHandlerCmdKey(cmd.constructor.name, err.type);
    const handler = this.handlers.get(key);
    // должно быть исклчение или дефолтная обработка ?
    handler?.(ctx);
  }
  register(key: string, cb: ExceptionHandlerFn): void {
    // тут нужны проверки
    this.handlers.set(key, cb);
  }
}
