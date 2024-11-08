export type GameEntity<T extends Object = {}> = {
  [K in keyof T]: T[K];
};
