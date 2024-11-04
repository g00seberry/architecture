import { ICommand } from "./ICommand";

export interface IQueue<T = unknown> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  isEmpty(): boolean;
}

export class CommandQueue implements IQueue<ICommand> {
  list: ICommand[] = [];
  enqueue(item: ICommand) {
    this.list.push(item);
  }
  dequeue(): ICommand | undefined {
    return this.list.shift();
  }
  isEmpty(): boolean {
    return this.list.length === 0;
  }
}

const commandQueue: IQueue<ICommand> = new CommandQueue();
export const getCommandQueue = () => commandQueue;
