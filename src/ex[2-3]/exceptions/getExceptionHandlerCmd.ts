import { ICommand } from "../Command/ICommand";
import { CommandFilterAndExecute } from "../commands";
import { IExceptionBase } from "../ExceptionHandler/IExceptionBase";
import { ExceptionCmdType } from "./ExceptionCmd";
import {
  ExceptionHandlerCmd,
  ExceptionHandlerContextCmd,
} from "./ExceptionHandlerCmd";

export const makeExceptionHandlerCmdKey = (
  cmdName: string,
  errType: ExceptionCmdType
) => `${cmdName}_${errType}`;

const exceptionHandlerCmd = new ExceptionHandlerCmd();
export const getExceptionHadlerCmd = () => exceptionHandlerCmd;
export const makeExceptionHadlerContextCmd = (
  newCmd: ICommand,
  newErr: IExceptionBase
) => new ExceptionHandlerContextCmd(newCmd, newErr);
