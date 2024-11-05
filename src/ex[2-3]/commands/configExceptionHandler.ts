import { CoreCmd } from "../Core/CoreCmd";
import { ExceptionCmdType } from "../exceptions/ExceptionCmd";
import { makeExceptionHandlerCmdKey } from "../exceptions/getExceptionHandlerCmd";
import { CommandMoveLinear } from "./CommandMoveLinear";
import { CommandProduceEntities } from "./CommandProduceEntities";
import { CommandRotateVelocity } from "./CommandRotateVelocity";
import { enqueueLogOnFail, trySomeTimesAndLog } from "./exceptionHandlers";

export const configExceptionHandler = (core: CoreCmd) => {
  const { cmdExceptionHandler } = core.config;

  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CommandMoveLinear.name,
      ExceptionCmdType["unconsistent data"]
    ),
    enqueueLogOnFail(core)
  );
  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CommandRotateVelocity.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 1)
  );
  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CommandProduceEntities.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 2)
  );
};
