import { getExceptionHadlerCmd } from "./ExceptionHandlerCmd";
import { getCommandQueue } from "./Core/Command/CommandQueue";
import { CoreCmd, getCoreCmd } from "./Core/CoreCmd";
import { getEntityRegister } from "./Entity/GameEntityRegister";
import { configExceptionHandler } from "./common/commands/configExceptionHandler";
import { seedEx3 } from "./seeds/seedEx3";
import { makeExceptionHadlerContextCmd } from "./ExceptionHandlerCmd/ExceptionHandlerCmd";

const gameLoop = (core: CoreCmd) => {
  const { cmdExceptionHandler, cmdQueue } = core.config;
  while (!cmdQueue.isEmpty()) {
    const cmd = cmdQueue.dequeue();
    try {
      cmd.execute();
    } catch (error) {
      cmdExceptionHandler.handle(makeExceptionHadlerContextCmd(cmd, error));
    }
  }
};

const core = getCoreCmd();
core
  .init({
    cmdQueue: getCommandQueue(),
    cmdExceptionHandler: getExceptionHadlerCmd(),
    entityRegister: getEntityRegister(),
  })
  .then(() => {
    configExceptionHandler(core);
    seedEx3(core);
    gameLoop(core);
  });
