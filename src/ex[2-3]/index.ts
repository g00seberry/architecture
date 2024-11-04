import { getExceptionHadlerCmd } from "./exceptions";
import { getCommandQueue } from "./Command/CommandQueue";
import { CoreCmd, getCoreCmd } from "./Core/CoreCmd";
import { getEntityRegister } from "./Entity/GameEntityRegister";
import { configExceptionHandler } from "./commands/configExceptionHandler";
import { seedTestData } from "./seedTestData";
import { makeExceptionHadlerContextCmd } from "./exceptions/ExceptionHandlerCmd";

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
    seedTestData(core);
    gameLoop(core);
  });
