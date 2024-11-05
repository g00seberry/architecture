import { IExceptionBase } from "../IExceptionHandler";

export enum ExceptionCmdType {
  "unconsistent data" = "unconsistent data",
  "fuel is expended" = "fuel is expended",
}

export class ExceptionCmd extends Error implements IExceptionBase {
  readonly type: ExceptionCmdType;
  constructor(msg: string, type: ExceptionCmdType) {
    super(msg);
    this.type = type;
  }
}

export const makeExceptionCmd = (msg: string, type: ExceptionCmdType) =>
  new ExceptionCmd(msg, type);
