import { ICommand } from "../../Command/ICommand";

export class CommandRepeat implements ICommand {
  cmd: ICommand;
  repeat(cmd: ICommand) {
    this.cmd = cmd;
    return this;
  }
  execute() {
    this.cmd.execute();
  }
}
