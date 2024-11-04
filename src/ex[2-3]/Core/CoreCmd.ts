import { CoreConfig, ICore } from "./ICore";

export class CoreCmd implements ICore {
  config: CoreConfig;
  async init(cnf: CoreConfig) {
    this.config = cnf;
    return this.config;
  }
}
const core = new CoreCmd();

export const getCoreCmd = () => core;
