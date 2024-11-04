import { CoreCmd } from "../Core/CoreCmd";
import { ExceptionCmdType } from "../exceptions/ExceptionCmd";
import { makeExceptionHandlerCmdKey } from "../exceptions/getExceptionHandlerCmd";
import { CommandFilterAndExecute } from "./CommandFilterAndExecute";
import { CommandMoveLinear } from "./CommandMoveLinear";
import { CommandProduceEntities } from "./CommandProduceEntities";
import { CommandRotateVelocity } from "./CommandRotateVelocity";
import { enqueueLogOnFail, repeatOnceOnFail } from "./exceptionHandlers";

export const configExceptionHandler = (core: CoreCmd) => {
  const { cmdExceptionHandler } = core.config;
  const cmdsNames = [
    CommandFilterAndExecute.name,
    CommandMoveLinear.name,
    CommandProduceEntities.name,
    CommandRotateVelocity.name,
  ];
  cmdsNames.forEach((name) => {
    cmdExceptionHandler.register(
      makeExceptionHandlerCmdKey(name, ExceptionCmdType["unconsistent data"]),
      enqueueLogOnFail(core)
    );
    cmdExceptionHandler.register(
      makeExceptionHandlerCmdKey(name, ExceptionCmdType["unconsistent data"]),
      repeatOnceOnFail(core)
    );
  });
};
