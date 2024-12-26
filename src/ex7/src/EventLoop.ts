import { parentPort, workerData } from "worker_threads";
import { ICommand } from "../../ex[2-4]/Core/Command";
import { createEventQueue } from "./IEventQueue";
import { ThreadMsg } from "./types";
import { getIoCThread } from "./BootIoC";

const eventQueue: unknown[] = [];
const postBack = (data: unknown) => {
  eventQueue.push(data);
  parentPort.postMessage(eventQueue);
};

let { threadId } = workerData;
let isLoopActive = false;
let queue = createEventQueue<ICommand>();
const IoCThread = getIoCThread();

class CommandRunThread implements ICommand {
  async execute() {
    // отправялем обратно для тестирования --> поток запущен
    postBack({ threadId, type: "started" });
    isLoopActive = true;

    while (isLoopActive) {
      const command = queue.dequeue();
      try {
        if (command) {
          command.execute();
          // отправялем обратно для тестирования --> команда выполнена
          postBack({
            cmdName: command.constructor.name,
            type: "executed",
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      } catch (error) {
        // отправялем обратно для тестирования --> ошибка выполнения
        postBack({
          cmdName: command.constructor.name,
          type: "error",
        });
      }
    }
  }
}

class CommandSoftStop implements ICommand {
  isLoopActive = false;
  execute() {
    while (!queue.isEmpty()) {
      const command = queue.dequeue();
      try {
        command?.execute();
        // отправялем обратно для тестирования --> команда выполнена
        postBack({
          cmdName: command.constructor.name,
          type: "executed during soft stop",
        });
      } catch (error) {
        // отправялем обратно для тестирования --> ошибка выполнения
        postBack({
          cmdName: command.constructor.name,
          type: "error during soft stop",
        });
      }
    }
    postBack("softStop");
    process.exit(0);
  }
}
class CommandHardStop implements ICommand {
  execute() {
    isLoopActive = false;
    postBack("hardStop");
    process.exit(0);
  }
}

IoCThread.resolve("register")("hardStop", () => new CommandHardStop());
IoCThread.resolve("register")("softStop", () => new CommandSoftStop());
const systemCommands = new Set(["hardStop", "softStop"]);

parentPort?.on("message", (msg: ThreadMsg) => {
  const cmd = IoCThread.resolve(msg.type)(msg.data) as ICommand;
  if (systemCommands.has(msg.type)) {
    cmd.execute();
  } else {
    queue.enqueue(cmd);
  }
});

new CommandRunThread().execute();
