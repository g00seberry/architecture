import { IoC } from "./IoC";
import { IStrategyWithBind } from "./IStrategyWithBind";
import { IoCDependencyFn } from "./types";

export class IoCResolveStrategyStd implements IStrategyWithBind {
  dependencyName: string;
  scopeKey: string | undefined;
  bind(dependencyName: string, scopeKey?: string) {
    this.dependencyName = dependencyName;
    this.scopeKey = scopeKey;
    return this;
  }
  execute(): IoCDependencyFn {
    const rootScope = IoC.scopes.root();
    let lookingScope = IoC.scopes.findScope(this.scopeKey);
    if (!lookingScope) return rootScope.data.get(this.dependencyName);
    while (lookingScope) {
      const dep = lookingScope.data.get(this.dependencyName);
      if (dep) return dep;
      lookingScope = IoC.scopes.parentScope(lookingScope.key);
    }
    return undefined;
  }
}
