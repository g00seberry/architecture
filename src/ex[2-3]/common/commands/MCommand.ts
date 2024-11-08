import { ICommand } from "../../Core/Command";
/**
 * Как обрабатывать ошибку, возникшую в одной из команд, если
 */
export class MCommand implements ICommand {
  commands: ICommand[] = [];
  bind(commands: ICommand[]) {
    this.commands = commands;
  }
  execute() {
    this.commands.forEach((cmd) => cmd.execute());
  }
}
