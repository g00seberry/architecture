import { getRandomCmdDef } from "./src/BootIoC";
import { CommandCreateThread } from "./src/CommandCreateThread";
import { createThreadMsg } from "./src/types";

const cmd = new CommandCreateThread("thread1");
cmd.execute();

const worker = cmd.worker;

worker.on("error", (err) => {
  console.error(`Main: Error in worker: ${err}`);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Main: Worker stopped with code ${code}`);
  } else {
    console.log(`Main: Worker finished gracefully`);
  }
});

setInterval(() => {
  const cmd = getRandomCmdDef();
  worker.postMessage(createThreadMsg(cmd.name, cmd.data));
}, 1000);

setTimeout(() => {
  worker.postMessage(createThreadMsg("hardStop", null));
}, 5000);
