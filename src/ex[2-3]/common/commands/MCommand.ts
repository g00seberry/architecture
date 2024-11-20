import { ICommand } from "../../Core/Command";

export class MCommand implements ICommand {
  commands: ICommand[] = [];
  bind(commands: ICommand[]) {
    this.commands = commands;
  }
  execute() {
    this.commands.forEach((cmd) => cmd.execute());
  }
}
