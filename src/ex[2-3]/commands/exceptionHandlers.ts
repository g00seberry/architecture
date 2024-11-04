import { CoreCmd } from "../Core/CoreCmd";
import { ExceptionHandlerFn } from "../ExceptionHandler/IExceptionHandler";
import { ExceptionHandlerContextCmd } from "../exceptions";
import { CommandLog } from "./CommandLog";

export const enqueueLogOnFail =
  (core: CoreCmd): ExceptionHandlerFn =>
  (ctx) => {
    const { cmdQueue } = core.config;
    cmdQueue.enqueue(new CommandLog().log(ctx.getCtx()));
  };

// повторяет один раз, чтобы не было зацикливания
export const repeatOnFail =
  (core: CoreCmd): ExceptionHandlerFn =>
  (ctx: ExceptionHandlerContextCmd) => {
    const { cmdQueue } = core.config;
    cmdQueue.enqueue(ctx.getCtx().cmd);
  };

// повторяет один раз, чтобы не было зацикливания
export const repeatOnceOnFail = (core: CoreCmd): ExceptionHandlerFn => {
  let counter = 0;
  return () => {
    if (counter > 0) return;
    counter++;
    return repeatOnFail(core);
  };
};

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
