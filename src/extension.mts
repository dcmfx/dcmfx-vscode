import * as vscode from "vscode";
import {
  DCMFX_SCHEME,
  DcmfxPrintContentProvider,
  DcmfxPrintHoverProvider,
  printDicomCommand,
} from "./commands/print.mjs";
import { convertJsonToP10 } from "./commands/convert-json-to-p10.mjs";
import { rewriteP10 } from "./commands/rewrite-p10.mjs";

export function activate(context: vscode.ExtensionContext): void {
  const printContentProvider =
    vscode.workspace.registerTextDocumentContentProvider(
      DCMFX_SCHEME,
      new DcmfxPrintContentProvider(),
    );

  const printCommand = vscode.commands.registerCommand(
    "dcmfx.print",
    printDicomCommand("dcmfx-print"),
  );

  const printJsonCommand = vscode.commands.registerCommand(
    "dcmfx.printJson",
    printDicomCommand("json"),
  );

  const rewriteCommand = vscode.commands.registerCommand(
    "dcmfx.rewriteP10",
    rewriteP10(),
  );

  const convertToP10Command = vscode.commands.registerCommand(
    "dcmfx.convertJsonToP10",
    convertJsonToP10(),
  );

  const printHoverProvider = vscode.languages.registerHoverProvider(
    { language: "dcmfx-print" },
    new DcmfxPrintHoverProvider(),
  );

  context.subscriptions.push(
    printContentProvider,
    printCommand,
    printJsonCommand,
    rewriteCommand,
    convertToP10Command,
    printHoverProvider,
  );
}

export function deactivate() {}
