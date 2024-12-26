export interface IEventQueue<T> {
  enqueue(data: T): void;
  dequeue(): T | undefined;
  isEmpty(): boolean;
}

export class EventQueueSimple<T> implements IEventQueue<T> {
  arr: T[] = [];

  dequeue(): T | undefined {
    return this.arr.shift();
  }
  enqueue(data: T): void {
    this.arr.push(data);
  }
  isEmpty(): boolean {
    return this.arr.length === 0;
  }
}

export const createEventQueue = <T>(): IEventQueue<T> =>
  new EventQueueSimple<T>();
