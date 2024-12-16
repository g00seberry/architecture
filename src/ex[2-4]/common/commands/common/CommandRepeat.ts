import { ICommand } from "../../../Core/Command/ICommand";
import { CoreCmd } from "../../../Core/CoreCmd";

export class CommandRepeat implements ICommand {
  cmd: ICommand;
  core: CoreCmd;
  repeat(cmd: ICommand, core: CoreCmd) {
    this.cmd = cmd;
    this.core = core;
    return this;
  }
  execute() {
    this.core.config.cmdQueue.enqueue(this.cmd);
  }
}
