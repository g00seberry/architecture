import { IExceptionBase } from "../ExceptionHandler";

export enum ExceptionCmdType {
  "unconsistent data" = "unconsistent data",

  /**
   * специально для выполнения условий дз определим исключения
   */
  // Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.
  "try to repeat once" = "try to repeat once",
  // при первом выбросе исключения повторить команду, при повторном выбросе исключения записать информацию в лог.
  "try to repeat once and log if stil wrong" = "try to repeat once and log if stil wrong",
  // повторить два раза, потом записать в лог.
  "try to repeat 2 times and log if stil wrong" = "try to repeat 2 times and log if stil wrong",
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
