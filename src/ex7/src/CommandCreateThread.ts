import path from "path";
import { ICommand } from "../../ex[2-4]/Core/Command";
import { Worker } from "worker_threads";

export class CommandCreateThread implements ICommand {
  constructor(readonly threadId: string) {}
  worker: Worker | null = null;

  async execute() {
    const workerPath = path.resolve(__dirname, "../dist/ex7/src/EventLoop.js");
    this.worker = new Worker(workerPath, {
      workerData: { threadId: this.threadId },
    });
  }
}
