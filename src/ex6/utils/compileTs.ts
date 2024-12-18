import * as ts from "typescript";
export function tsCompile(
  source: string,
  options: ts.TranspileOptions = null
): string {
  // Default options -- you could also perform a merge, or use the project tsconfig.json
  if (null === options) {
    options = { compilerOptions: { module: ts.ModuleKind.CommonJS } };
  }
  return ts.transpileModule(source, options).outputText;
}
