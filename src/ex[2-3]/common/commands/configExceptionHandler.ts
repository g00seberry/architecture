import { CoreCmd } from "../../Core/CoreCmd";
import {
  ExceptionCmdType,
  makeExceptionCmdKey,
} from "../../ExceptionHandlerCmd/ExceptionCmd";
import { CommandMoveLinear } from "./CommandMoveLinear";
import { CommandProduceEntities } from "./CommandProduceEntities";
import { CommandRotateVelocity } from "./CommandRotateVelocity";
import { enqueueLogOnFail, trySomeTimesAndLog } from "./exceptionHandlers";

export const configExceptionHandler = (core: CoreCmd) => {
  const { cmdExceptionHandler } = core.config;

  cmdExceptionHandler.register(
    makeExceptionCmdKey(
      CommandMoveLinear.name,
      ExceptionCmdType["unconsistent data"]
    ),
    enqueueLogOnFail(core)
  );
  cmdExceptionHandler.register(
    makeExceptionCmdKey(
      CommandRotateVelocity.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 1)
  );
  cmdExceptionHandler.register(
    makeExceptionCmdKey(
      CommandProduceEntities.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 2)
  );
};
