import path from "path";
import { IoC } from "../ex5/IoC";
import { IStrategyWithBind } from "../ex5/IStrategyWithBind";
import { IStrategy } from "../ex[2-4]/Core/Strategy/IStrategy";
import { AutoGeneratedClassDef } from "./types";
import { getFileNames } from "./utils/getFileNames";
import { parseInterfaceFile } from "./utils/parseInterfaceFile";
import { ICommand } from "../ex[2-4]/Core/Command";

export class StrategyGenerateAdapters implements ICommand {
  constructor(readonly genStrat: IStrategyWithBind<AutoGeneratedClassDef>) {}

  async execute(): Promise<void> {
    await Promise.all([getFileNames(`${__dirname}/interfaces/`)]).then(
      ([fNames]) => {
        fNames.forEach((fName) => {
          try {
            const filePath = path.join(__dirname, `interfaces/${fName}`);
            const extractedData = parseInterfaceFile(filePath);
            const newClasses = extractedData.map((d) =>
              this.genStrat.bind(d).execute()
            );
            newClasses.forEach((cls) =>
              IoC.resolve("register")(cls.name, (obj: any) => {
                const BootCls = cls.bootstrapFn();
                return new BootCls(obj, IoC);
              })
            );
          } catch (error) {
            console.error(`Error: ${error.message}`);
          }
        });
      }
    );
  }
}
