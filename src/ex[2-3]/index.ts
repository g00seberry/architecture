import {
  getExceptionHadlerCmd,
  makeExceptionHadlerContextCmd,
} from "./exceptions";
import { makeExceptionHandlerCmdKey } from "./exceptions/getExceptionHandlerCmd";
import { getCommandQueue } from "./Command/CommandQueue";
import { CoreCmd, getCoreCmd } from "./Core/CoreCmd";
import { getEntityRegister } from "./Entity/GameEntityRegister";
import { configExceptionHandler } from "./commands/common";
import { seedTestData } from "./seedTestData";

const gameLoop = (core: CoreCmd) => {
  const { cmdExceptionHandler, cmdQueue } = core.config;
  while (!cmdQueue.isEmpty()) {
    const cmd = cmdQueue.dequeue();
    try {
      cmd.execute();
    } catch (error) {
      const exceptionKey = makeExceptionHandlerCmdKey(
        cmd.constructor.name,
        error.type
      );
      cmdExceptionHandler.handle(
        exceptionKey,
        makeExceptionHadlerContextCmd(cmd, error)
      );
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
    seedTestData(core);
    gameLoop(core);
  });
