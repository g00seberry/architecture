import { ICommand } from "../../../Core/Command/ICommand";
import { CoreCmd } from "../../../Core/CoreCmd";

export class CommandRepeat implements ICommand {
  cmd: ICommand | null = null;
  core: CoreCmd | null = null;
  repeat(cmd: ICommand, core: CoreCmd) {
    this.cmd = cmd;
    this.core = core;
    return this;
  }
  execute() {
    if (this.core && this.cmd) this.core.config.cmdQueue.enqueue(this.cmd);
  }
}
