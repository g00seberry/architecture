import { CoreCmd } from "../Core/CoreCmd";
import { ExceptionHandlerFn } from "../ExceptionHandler/IExceptionHandler";
import { ExceptionHandlerContextCmd } from "../exceptions";
import { CommandLog, CommandRepeat } from "./common";

// 5.Реализовать обработчик исключения, который ставит Команду, пишущую в лог в очередь Команд.
export const enqueueLogOnFail =
  (core: CoreCmd): ExceptionHandlerFn =>
  (ctx) => {
    const { cmdQueue } = core.config;
    cmdQueue.enqueue(new CommandLog().log(ctx.getCtx()));
  };

// Реализовать обработчик исключения, который ставит в очередь Команду - повторитель команды, выбросившей исключение.
export const enqueueRepeatOnFail =
  (core: CoreCmd): ExceptionHandlerFn =>
  (ctx: ExceptionHandlerContextCmd) => {
    const { cmdQueue } = core.config;
    cmdQueue.enqueue(new CommandRepeat().repeat(ctx.getCtx().cmd));
  };

/**
 * 8.С помощью Команд из пункта 4 и пункта 6 реализовать следующую обработку исключений:
 * при первом выбросе исключения повторить команду, при повторном выбросе исключения записать информацию в лог.
 * 9.Реализовать стратегию обработки исключения - повторить два раза, потом записать в лог.
 */
export const trySomeTimesAndLog = (
  core: CoreCmd,
  times: number
): ExceptionHandlerFn => {
  let counter = 1;
  return (ctx) => {
    if (counter < times) {
      enqueueRepeatOnFail(core)(ctx);
    } else if (counter === times - 1) {
      enqueueRepeatOnFail(core)(ctx);
      enqueueLogOnFail(core)(ctx);
    }
    counter++;
  };
};
