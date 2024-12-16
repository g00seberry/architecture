export interface IStrategyWithBind<TData = unknown> {
  bind(...args: unknown[]): IStrategyWithBind<TData>;
  execute(): TData;
}
