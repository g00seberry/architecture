import { GameEntity } from "./GameEntity";

export interface IGameEntityRegister {
  registerEntity(ent: GameEntity): void;
  unregister(ent: GameEntity): GameEntity | undefined;
  list(): GameEntity[];
}

/**
 * Хреновое решение, но пока что так, чтобы не задерживаться.
 */
export class GameEntityRegisterList implements IGameEntityRegister {
  pool: GameEntity[] = [];
  registerEntity(ent: GameEntity): void {
    if (this.pool.find((e) => e === ent)) return;
    this.pool.push(ent);
  }
  unregister(ent: GameEntity): GameEntity | undefined {
    const e = this.pool.find((e) => e === ent);
    if (!!e) this.pool = this.pool.filter((e) => e !== ent);
    return e;
  }
  list(): GameEntity[] {
    return this.pool;
  }
}

const entityRegister: IGameEntityRegister = new GameEntityRegisterList();

export const getEntityRegister = () => entityRegister;
