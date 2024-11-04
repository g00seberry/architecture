import { IQueue } from "../Command";
import { ICommand } from "../Command/ICommand";
import { IGameEntityRegister } from "../Entity/GameEntityRegister";
import { IExceptionHandler } from "../ExceptionHandler";

export type CoreStatus = "ready" | "fail" | "wait" | "created";

export type CoreConfig = {
  cmdQueue: IQueue<ICommand>;
  cmdExceptionHandler: IExceptionHandler;
  entityRegister: IGameEntityRegister;
};

export interface ICore {
  init(cnf: CoreConfig): Promise<unknown>;
}
