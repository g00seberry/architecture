import * as ts from "typescript";

export interface ParameterInfo {
  name: string;
  type: string;
}

export interface FunctionInfo {
  name: string;
  parameters: ParameterInfo[];
  returnType: string;
}

export interface InterfaceInfo {
  name: string;
  functions: FunctionInfo[];
}

export function parseInterfaceFile(filePath: string): InterfaceInfo[] {
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
  });

  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error(`Source file not found: ${filePath}`);
  }

  const interfaceInfos: InterfaceInfo[] = [];
  const typeChecker = program.getTypeChecker();
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceInfo: InterfaceInfo = {
        name: node.name.text,
        functions: [],
      };
      node.members.forEach((member) => {
        if (ts.isMethodSignature(member)) {
          const functionInfo: FunctionInfo = {
            name: member.name.getText(sourceFile),
            parameters: [],
            returnType: typeChecker.typeToString(
              typeChecker.getTypeAtLocation(member.type!)
            ),
          };
          member.parameters.forEach((param) => {
            let paramName: string = "";
            if (ts.isIdentifier(param.name)) {
              paramName = param.name.text;
            } else if (ts.isEmptyBindingPattern(param.name)) {
              paramName = param.name.getText(sourceFile);
            }
            const paramInfo: ParameterInfo = {
              name: paramName,
              type: typeChecker.typeToString(
                typeChecker.getTypeAtLocation(param)
              ),
            };
            functionInfo.parameters.push(paramInfo);
          });
          interfaceInfo.functions.push(functionInfo);
        }
      });
      interfaceInfos.push(interfaceInfo);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return interfaceInfos;
}
