import { ExceptionHandlerCmd } from "./ExceptionHandlerCmd";

export const makeExceptionHandlerCmdKey = (cmdName: string, errType: string) =>
  `${cmdName}_${errType}`;

export const getExceptionHadlerCmd = () => new ExceptionHandlerCmd();
