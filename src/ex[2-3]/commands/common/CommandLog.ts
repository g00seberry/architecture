import { ICommand } from "../../Command/ICommand";

export class CommandLog implements ICommand {
  data: unknown;
  log(data: unknown) {
    this.data = data;
    return this;
  }
  execute() {
    console.log("CommandLog:", JSON.stringify(this.data));
  }
}
