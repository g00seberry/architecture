import { Worker } from "worker_threads";
import { CommandCreateThread } from "./src/CommandCreateThread";
import { createThreadMsg } from "./src/types";
import { getCmdsDef4Testing } from "./src/BootIoC";

/**
 * не ясно, как тестировать это все, мы не имеем возможности шарить память между потоками
 * Поэтому было решено отправлять некий массив данных из потока, который мог бы показать, какие события произошли
 */
test("start thread and soft stop", async () => {
  const cmd = new CommandCreateThread("thread1");
  cmd.execute();
  const worker = cmd.worker;
  const cmdsDefs4Testing = getCmdsDef4Testing();

  const res = new Promise((res) => {
    let counter = 0;
    const intId = setInterval(() => {
      if (counter === 3) {
        worker.postMessage(createThreadMsg("softStop", null));
        clearInterval(intId);
      }
      const cmd = cmdsDefs4Testing[counter];
      if (cmd) worker.postMessage(createThreadMsg(cmd.name, cmd.data));
      counter++;
    }, 0);

    let counter2 = 0;
    worker.addListener("message", (msg) => {
      counter2++;
      if (counter2 === 5) {
        res(msg);
      }
    });
  });

  const msg1 = await res;
  await worker.terminate();
  expect(msg1).toEqual([
    { threadId: "thread1", type: "started" },
    { cmdName: "Cmd1", type: "executed during soft stop" },
    { cmdName: "Cmd2", type: "executed during soft stop" },
    { cmdName: "CmdWithErr", type: "error during soft stop" },
    "softStop",
  ]);
});

test("start thread and hard stop", async () => {
  const cmd = new CommandCreateThread("thread1");
  cmd.execute();
  const worker = cmd.worker;
  const cmdsDefs4Testing = getCmdsDef4Testing();

  const res = new Promise((res) => {
    let counter = 0;
    const intId = setInterval(() => {
      if (counter === 3) {
        worker.postMessage(createThreadMsg("hardStop", null));
        clearInterval(intId);
      }
      const cmd = cmdsDefs4Testing[counter];
      if (cmd) worker.postMessage(createThreadMsg(cmd.name, cmd.data));
      counter++;
    }, 0);

    let counter2 = 0;
    worker.addListener("message", (msg) => {
      counter2++;
      if (counter2 === 2) {
        res(msg);
      }
    });
  });

  const msg1 = await res;
  await worker.terminate();
  expect(msg1).toEqual([{ threadId: "thread1", type: "started" }, "hardStop"]);
});
