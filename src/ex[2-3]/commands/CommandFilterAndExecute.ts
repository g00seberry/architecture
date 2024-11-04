import { ICommand } from "../Command/ICommand";
import { ExceptionCmdType, makeExceptionCmd } from "../exceptions/ExceptionCmd";

type FilterFn<T> = (list: T[]) => ICommand[];

export class CommandFilterAndExecute<T> implements ICommand {
  list: T[] | null = null;
  filterFn: FilterFn<T> | null = null;
  filterAndExecute(newlist: T[], cb: FilterFn<T>) {
    this.list = newlist;
    this.filterFn = cb;
    return this;
  }
  execute() {
    if (!this.list || !this.filterFn)
      throw makeExceptionCmd(
        "Unconsistent data. Can`t perform CommandFilterAndExecute command.",
        ExceptionCmdType["unconsistent data"]
      );
    const filtred = this.filterFn(this.list);
    filtred.forEach((c) => c.execute());
  }
}
