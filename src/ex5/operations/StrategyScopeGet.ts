import { IoC } from "../IoC";
import { IStrategyWithBind } from "../IStrategyWithBind";
import { IScope } from "../types";

export class StrategyScopeGet implements IStrategyWithBind<IScope | undefined> {
  scopeKey: string | undefined;
  bind(scopeKey?: string) {
    this.scopeKey = scopeKey;
    return this;
  }
  execute() {
    const root = IoC.scopes.root();
    const actualScope = this.scopeKey
      ? IoC.scopes.findScope(this.scopeKey)
      : root;
    if (!actualScope) throw Error(`undefined scope key ${this.scopeKey}`);
    return actualScope;
  }
}
