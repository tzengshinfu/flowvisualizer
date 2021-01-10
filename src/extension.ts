import * as vscode from 'vscode';
import * as parser from '@babel/parser';
import * as t from '@babel/traverse';
import generate, * as g from '@babel/generator';
import { traverse } from '@babel/types';

export function activate(context: vscode.ExtensionContext) {
	const provider = new FlowViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(FlowViewProvider.id, provider));
}

class FlowViewProvider implements vscode.WebviewViewProvider {

	public static readonly id = 'flowvisualizer.flowview';

	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri,) {
	}

	public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken,) {
		this._view = webviewView;
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				this._extensionUri
			]
		};
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'colorSelected':
					{
						vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
						break;
					}
			}
		});
	}

	public addColor() {
		if (this._view) {
			this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
			this._view.webview.postMessage({ type: 'addColor' });
		}
	}

	public clearColors() {
		if (this._view) {
			this._view.webview.postMessage({ type: 'clearColors' });
		}
	}

	public test() {
		const sourceCode = `
				//開始
				console.log('start');
				var var1 = 2;			
				
				function plus(n) {
					return n + 1;
				}
				
				/**
				非同步計算
				*/
				async function calculateAsync() {
					var var1 = 1;
					var var2 = await plusAsync(var1);
					var var3 = plus(var2);
					var var4 = await plusAsync(var3);
					
					var var5Task = plusAsync(var4);
					var var6 = 6;
					var var7Task = plusAsync(var6);
				
					var [var5, var7] = await Promise.all([var5Task, var7Task]);
					
					console.log(var5 + var7);
				}
				
				function minus(n) {
					return n - 1;
				}
				
				try {
					if (var1 === 1) {
						var var2 = var1 + 1;
			
						switch (var2) {
							case 1:
								var2 = 2;
								break;
						
							case 2:
								var2 = 1;
								break;
						
							default:
								throw var2;
						}
					}
					else if (var1 === 2) {
						var var3 = 5;
						var result = 0;
			
						for (var runTimes = 1; runTimes <= var3; runTimes++) {
							result += plus(runTimes);
						}
			
						while (var3 >= 10) {
							result += minus(var3);
							contiune;
						}
			
						do {
							result += minus(var3);
							break;
						}
						while (var3 <= 10);
					}
					else if (var1 === 3) {
						var ary1 = [1, 2, 3];
			
						ary1.forEach(function(item, index, array){
							item = item + 1;
						});
					}
					else {
						let task1 = new Promise((resolve, reject) => {
						});
			
						task1.then((data)=> {
							console.log(data);
						}).then((data)=> {
							console.log(data);
						}).catch((err)=> {
							console.log(err);
						}).finally(()=> {
							console.log('done!');
						});				
					}
			
					debugger;
					console.log(var1);
				}
				catch (ex) {
					console.log('catch');
				}
				finally {
					console.log('finally');
				}
	
				(async function() {
					await calculateAsync();
					
					//結束
					console.log('completed');
				}());
				
				function plusAsync(n) {
					return new Promise(resolve => {
						setTimeout(() => {
							resolve(plus(n));
						}, 0);
					});
				};`;
		const ast = parser.parse(sourceCode);
		const codeNodes = parser.parse(sourceCode).program.body;
		const functionNodes = codeNodes.filter((node) => { return node.type === 'FunctionDeclaration'; });
		const flowNodes = codeNodes.filter((node) => { return node.type !== 'FunctionDeclaration'; });
		traverse(ast, {
			enter(path) {
				//if (path.type === 'FunctionDeclaration') {
				console.log(path.type);
				//}
			}
		})
		const result = generate(ast);
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
		const nonce = (()=>{
			let text = '';
			const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for (let i = 0; i < 32; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		})();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">
				
				<title>Cat Colors</title>
			</head>
			<body>
				<ul class="color-list">
				</ul>

				<button class="add-color-button">Generate Flow From Code</button>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}
