import { ICommand } from "../Command";
import { CommandQueue, getCommandQueue } from "../Command/CommandQueue";
import { CommandLog, CommandRepeat } from "../commands/common";
import { SimpleLogger } from "../commands/common/CommandLog";
import {
  enqueueLogOnFail,
  enqueueRepeatOnFail,
  trySomeTimesAndLog,
} from "../commands/exceptionHandlers";
import { CoreCmd, getCoreCmd } from "../Core/CoreCmd";
import { MovableGameEntity } from "../Entity/GameEntity";
import { getEntityRegister } from "../Entity/GameEntityRegister";
import {
  getExceptionHadlerCmd,
  makeExceptionHandlerCmdKey,
} from "../ExceptionHandlerCmd";
import {
  ExceptionCmdType,
  makeExceptionCmd,
} from "../ExceptionHandlerCmd/ExceptionCmd";
import { makeExceptionHadlerContextCmd } from "../ExceptionHandlerCmd/ExceptionHandlerCmd";
import { Vector2 } from "../interfaces/IVector";
import { VelocityVec } from "../interfaces/IVelocity";

class CmdWithError implements ICommand {
  execute() {
    throw makeExceptionCmd("test", ExceptionCmdType["unconsistent data"]);
  }
}

const gameLoopStep = (core: CoreCmd) => {
  const { cmdExceptionHandler, cmdQueue } = core.config;
  const cmd = cmdQueue.dequeue();
  try {
    console.log(cmd);
    cmd.execute();
  } catch (error) {
    console.log(cmd);
    cmdExceptionHandler.handle(makeExceptionHadlerContextCmd(cmd, error));
  }
};

const getInitedCore = async () => {
  const core = getCoreCmd();
  await core.init({
    cmdQueue: getCommandQueue(),
    cmdExceptionHandler: getExceptionHadlerCmd(),
    entityRegister: getEntityRegister(),
  });
  return core;
};

test("Реализовать Команду, которая записывает информацию о выброшенном исключении в лог.", () => {
  const logCmd = new CommandLog(new SimpleLogger());
  logCmd.log(1).execute();
  expect((logCmd.logger as SimpleLogger).logReg.length).toEqual(1);
});

test("Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.", async () => {
  const core = await getInitedCore();
  enqueueLogOnFail(core)(
    makeExceptionHadlerContextCmd(
      new CommandLog(new SimpleLogger()),
      makeExceptionCmd("test", ExceptionCmdType["unconsistent data"])
    )
  );
  expect(core.config.cmdQueue.isEmpty()).toEqual(false);
});

test("Реализовать Команду, которая повторяет Команду, выбросившую исключение.", async () => {
  const core = await getInitedCore();
  const { cmdQueue, entityRegister, cmdExceptionHandler } = core.config;
  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CmdWithError.name,
      ExceptionCmdType["unconsistent data"]
    ),
    enqueueRepeatOnFail(core)
  );
  const ent = new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  );
  entityRegister.registerEntity(ent);
  const cmdWithErr = new CmdWithError();
  cmdQueue.enqueue(cmdWithErr);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
});

test("Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.", async () => {
  const core = await getInitedCore();
  enqueueRepeatOnFail(core)(
    makeExceptionHadlerContextCmd(
      new CommandLog(new SimpleLogger()),
      makeExceptionCmd("test", ExceptionCmdType["unconsistent data"])
    )
  );
  expect(core.config.cmdQueue.isEmpty()).toEqual(false);
});

test("При первом выбросе исключения повторить команду, при повторном выбросе исключения записать информацию в лог.", async () => {
  const core = await getInitedCore();
  const { cmdQueue, entityRegister, cmdExceptionHandler } = core.config;
  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CmdWithError.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 1)
  );
  const ent = new MovableGameEntity(
    new Vector2([12, 5]),
    new VelocityVec(new Vector2([-7, 3]))
  );
  entityRegister.registerEntity(ent);
  const cmdWithErr = new CmdWithError();
  cmdQueue.enqueue(cmdWithErr);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandLog.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(cmdQueue.isEmpty()).toEqual(true);
});

test("Реализовать стратегию обработки исключения - повторить два раза, потом записать в лог.", async () => {
  const core = await getInitedCore();
  const { cmdQueue, cmdExceptionHandler } = core.config;
  cmdExceptionHandler.register(
    makeExceptionHandlerCmdKey(
      CmdWithError.name,
      ExceptionCmdType["unconsistent data"]
    ),
    trySomeTimesAndLog(core, 2)
  );
  const cmdWithErr = new CmdWithError();
  cmdQueue.enqueue(cmdWithErr);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandRepeat.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CmdWithError.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(
    (cmdQueue as CommandQueue).list[0].constructor.name === CommandLog.name
  ).toEqual(true);
  gameLoopStep(core);
  expect(cmdQueue.isEmpty()).toEqual(true);
});
