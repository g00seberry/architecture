import { MovableGameEntity, RotatableGameEntity } from "./GameEntity";

export interface IFactory<T> {
  produce(): T;
}

type MovableEntityFactorySrcData = [
  MovableGameEntity["location"],
  MovableGameEntity["velocity"]
];

export class FactoryMovableEntity implements IFactory<MovableGameEntity[]> {
  source: MovableEntityFactorySrcData[];
  constructor(data: MovableEntityFactorySrcData[]) {
    this.source = data;
  }
  produce() {
    return this.source.map(([l, v]) => new MovableGameEntity(l, v));
  }
}

type RotatableEntityFactorySrcData = [
  RotatableGameEntity["rotationVelocity"],
  RotatableGameEntity["velocity"]
];

export class FactoryRotatableEntity implements IFactory<RotatableGameEntity[]> {
  source: RotatableEntityFactorySrcData[];
  constructor(data: RotatableEntityFactorySrcData[]) {
    this.source = data;
  }
  produce() {
    return this.source.map(([l, v]) => new RotatableGameEntity(l, v));
  }
}
