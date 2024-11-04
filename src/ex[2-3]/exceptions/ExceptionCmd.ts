import { IExceptionBase } from "../ExceptionHandler";

export enum ExceptionCmdType {
  "unconsistent data" = "unconsistent data",
}

export class ExceptionCmd extends Error implements IExceptionBase {
  private type: ExceptionCmdType;
  constructor(msg: string, type: ExceptionCmdType) {
    super(msg);
    this.type = type;
  }
  getType(): string {
    return this.type;
  }
}

export const makeExceptionCmd = (msg: string, type: ExceptionCmdType) =>
  new ExceptionCmd(msg, type);
