import { getCommandQueue } from "../Core/Command/CommandQueue";
import { CoreCmd, getCoreCmd } from "../Core/CoreCmd";
import { getEntityRegister } from "../Entity";
import { getExceptionHadlerCmd } from "../ExceptionHandlerCmd";
import { makeExceptionHadlerContextCmd } from "../ExceptionHandlerCmd/ExceptionHandlerCmd";

export const gameLoopStep = (core: CoreCmd) => {
  const { cmdExceptionHandler, cmdQueue } = core.config;
  const cmd = cmdQueue.dequeue();
  try {
    cmd.execute();
  } catch (error) {
    cmdExceptionHandler.handle(makeExceptionHadlerContextCmd(cmd, error));
  }
};

export const getInitedCore = async () => {
  const core = getCoreCmd();
  await core.init({
    cmdQueue: getCommandQueue(),
    cmdExceptionHandler: getExceptionHadlerCmd(),
    entityRegister: getEntityRegister(),
  });
  return core;
};
