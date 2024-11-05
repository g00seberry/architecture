import { CoreCmd } from "../Core/CoreCmd";
import { ExceptionHandlerFn } from "../ExceptionHandler/IExceptionHandler";
import { ExceptionHandlerContextCmd } from "../exceptions";
import { CommandLog } from "./CommandLog";
import { CommandRepeat } from "./CommandRepeat";

// 5.Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.
export const enqueueLogOnFail =
  (core: CoreCmd): ExceptionHandlerFn =>
  (ctx) => {
    const { cmdQueue } = core.config;
    cmdQueue.enqueue(new CommandLog().log(ctx.getCtx()));
  };

// Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.
export const repeatOnFail =
  (core: CoreCmd): ExceptionHandlerFn =>
  (ctx: ExceptionHandlerContextCmd) => {
    const { cmdQueue } = core.config;
    cmdQueue.enqueue(new CommandRepeat().repeat(ctx.getCtx().cmd));
  };

// повторяет один раз
export const repeatOnceOnFail = (core: CoreCmd): ExceptionHandlerFn => {
  let counter = 0;
  return () => {
    if (counter > 0) return;
    counter++;
    return repeatOnFail(core);
  };
};

// повторяет один раз и пишев в лог, если ошибка сохранилась
export const repeatOnceAndLogIfStillWrong = (
  core: CoreCmd
): ExceptionHandlerFn => {
  let counter = 0;
  return () => {
    if (counter === 0) return repeatOnFail(core);
    if (counter === 1) return enqueueLogOnFail(core);
    counter++;
  };
};
