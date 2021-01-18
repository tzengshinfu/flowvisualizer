import * as vscode from 'vscode';
import * as parser from '@babel/parser';
import * as t from '@babel/traverse';
import generate, * as g from '@babel/generator';
import { ExpressionStatement, traverse } from '@babel/types';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	const provider = new FlowVisualizerViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(FlowVisualizerViewProvider.id, provider));
}

class FlowVisualizerViewProvider implements vscode.WebviewViewProvider {
	public static readonly id = 'flowvisualizer';
	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri,) {
	}

	public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken,) {
		this._view = webviewView;
		webviewView.webview.options = { enableScripts: true, localResourceRoots: [this._extensionUri] };
		webviewView.webview.html = this._createInitialViewHtml(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(message => {
			switch (message.id) {
				case 'generateFlowBlock': {
					if (vscode.window.activeTextEditor?.document) {
						var code = vscode.window.activeTextEditor.document.getText();

						//if (code) {
						var flowBlockHtml = this.createFlowBlockHtml(code);

						//webviewView.webview.html = webviewView.webview.html.replace(/(\<div\ id\=\"flow\-block\"\>).*(\<\/div\>)/s, '$1' + flowBlockHtml + '$2');
						var filePath = 'D:\\Desktop\\test.html';
						fs.writeFileSync(filePath, flowBlockHtml, 'utf8');
						//}
					}
					break;
				}
			}
		});
	}

	public createFlowBlockHtml(code: string) {
		var result = '';
		var flowCode = '';
		const sourceCode = `
		var ppp = 1;
		if (ppp === 1) {
			console.log(ppp);
		}

		if (ppp === 1) {
			console.log(ppp);
		}
		else {
			console.log(ppp);
		}

		if (ppp === 1) {
			console.log(ppp);
		}
		else if (ppp === 2) {
			//comment1
		}
		else if (ppp === 3) {
			/*
			test
			test2
			*/
		}	

		if (ppp === 1) {
			console.log(ppp);
		}
		else if (ppp === 2) {
			//comment1
		}
		else if (ppp === 3) {
			/*
			test
			test2
			*/
		}
		else {
			console.log('else');
		}

		//test
		/**comment1
		 * comment2
		 * comment3
		 */

		//開始
		console.log('start');
		//開始4

		var var1 = 2;	
		
		class Triangle {
			/** innerComment1 */
		}

		function Test() {
			//innerComment2
		}

		class Rectangle {			
			constructor(height, width) {
				this.height = height;
				this.width = width;
			}
			
			// Getter
			get area() {
				return this.calcArea();
			}
			// Method
			calcArea() {
				return this.height * this.width;
			}
		}
		
		function plus(n) {
			var p = new Object();
			
			loop1:
			for (var pp of p) {		
				console.log(pp);

				loop2:
				for (var ppp in pp) {
					if (ppp === 1) {
						break loop1;
					}
					else if (ppp === 2) {
						//comment1
					}
					else if (ppp === 3) {
						/*
						test
						test2
						*/
					}
					else {
						continue loop2;
					}

					console.log(ppp);
				}
			}

			return n + 1;
		}
		
		/**
		非同步計算
		非同步計算2
		*/
		async function calculateAsync() {
			//#region 
			var var1 = 1;
			var var2 = await plusAsync(var1);
			var var3 = plus(var2);
			var var4 = await plusAsync(var3);
			//#endregion
			
			var var5Task = plusAsync(var4);
			var var6 = 6;
			var var7Task = plusAsync(var6);
		
			var [var5, var7] = await Promise.all([var5Task, var7Task]);
			
			console.log(var5 + var7);
		}
		
		function minus(n) {
			var a;		

			with (Math) {
			  a = PI * r * r;
			}

			console.log(a);

			return n - 1;
		}
		
		try {
			if (var1 === 1) {
				var var2 = var1 + 1;
		
				switch (var2) {
					case 1:
					case 3:
						console.log(var2);
						var2 = 2;
						break;
				
					case 4:
					case 2:
						var2 = 1;
						console.log(var2);
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
					continue;
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
					if (item === 1) {
						item = item + 3;
					}
					else if (item === 2) {
						item = item + 2;
					}
					else {
						item = item + 1;
					}					
				});

				var ary2 = ary1.filter((item)=>{return item > 1;});
			}
			else if (var1 === 4) {
				const square = new Rectangle(10, 10);

				console.log(square.area); // 100
			}
			else if (var1 === 5) {
				var num = function message(x) {
					return x + x;
				}
				
				console.log(num(7)); // returns 14

				var num2 = function (x) {
					return x + x;
				}
				
				console.log(num2(7)); // returns 14

				(function () {
					console.log('Immediately Invoked Function Expression.');
				})();

				var num3 = (function () {
					return 14;
				})();

				console.log(num3); //14
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
			//結束2
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

		traverse(ast, {
			enter(node) {
				if (['File', 'Program'].includes(node.type.toString())) {
					return;
				}

				//if (['ExpressionStatement'].includes(node.type.toString())) {
				//	Object.assign(node, { headTags: '<div>' });
				//}

				var blockHead = '\n' + '<div>' + node.type;
				flowCode += blockHead;

				// if (['ForOfStatement'
				// 	, 'WhileStatement'
				// 	, 'TryStatement'
				// 	, 'ThrowStatement'
				// 	, 'SwitchStatement'
				// 	, 'ReturnStatement'
				// 	, 'LabeledStatement'
				// 	, 'IfStatement'
				// 	, 'ForInStatement'
				// 	, 'ForStatement'
				// 	, 'DoWhileStatement'
				// 	, 'ContinueStatement'
				// 	, 'BreakStatement'].includes(node.type.toString())) {
				// 	var code = generate(node).code;
				// 	console.log(code);
				// }

				if (['ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration', 'ImportDeclaration'].includes(node.type.toString())) {

				}
			},
			exit(node) {
				if (['File', 'Program'].includes(node.type.toString())) {
					return;
				}

				//if (['ExpressionStatement'].includes(node.type.toString())) {
				//	Object.assign(node, { tailTags: '</div>' });
				//}

				var blockTail = '</div>' + '\n';
				flowCode += blockTail;

				// if (['ForOfStatement'
				// 	, 'WhileStatement'
				// 	, 'TryStatement'
				// 	, 'ThrowStatement'
				// 	, 'SwitchStatement'
				// 	, 'ReturnStatement'
				// 	, 'LabeledStatement'
				// 	, 'IfStatement'
				// 	, 'ForInStatement'
				// 	, 'ForStatement'
				// 	, 'DoWhileStatement'
				// 	, 'ContinueStatement'
				// 	, 'BreakStatement'].includes(node.type.toString())) {
				// 	var code = generate(node).code;
				// 	console.log(code);
				// }
			}
		});
		//const result = generate(ast);
		//result = result.replace(/\s/g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\n/g, '<br />');
		return flowCode;
	}

	private _createInitialViewHtml(webview: vscode.Webview) {
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));
		const nonce = (() => {
			let text = '';
			const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for (let i = 0; i < 32; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		})();

		return `
			<!DOCTYPE html>
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
					<title>FlowVisualizer</title>
				</head>
				<body>
					<div id="flow-block"></div>
					<button id="generate-flow-block-button">Generate Flow Block From Code</button>
					<script nonce="${nonce}" src="${scriptUri}"></script>
				</body>
			</html>`;
	}
}
