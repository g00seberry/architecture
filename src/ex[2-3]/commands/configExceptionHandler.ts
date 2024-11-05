import { CoreCmd } from "../Core/CoreCmd";
import { ExceptionCmdType } from "../exceptions/ExceptionCmd";
import { makeExceptionHandlerCmdKey } from "../exceptions/getExceptionHandlerCmd";
import { CommandMoveLinear } from "./CommandMoveLinear";
import { CommandProduceEntities } from "./CommandProduceEntities";
import { CommandRotateVelocity } from "./CommandRotateVelocity";
import { enqueueLogOnFail, repeatOnceOnFail } from "./exceptionHandlers";

export const configExceptionHandler = (core: CoreCmd) => {
  const { cmdExceptionHandler } = core.config;
  const cmdsNames = [
    CommandMoveLinear.name,
    CommandProduceEntities.name,
    CommandRotateVelocity.name,
  ];

  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CommandMoveLinear.name,
      ExceptionCmdType["unconsistent data"]
    ),
    enqueueLogOnFail(core)
  );
};
