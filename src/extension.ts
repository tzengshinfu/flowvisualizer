import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const provider = new FlowVisualizerViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(FlowVisualizerViewProvider.id, provider));
}

export class FlowVisualizerViewProvider implements vscode.WebviewViewProvider {
	public static readonly id = 'flowvisualizer';
	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri,) {
	}

	public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken,) {
		this._view = webviewView;
		webviewView.webview.options = { enableScripts: true, localResourceRoots: [this._extensionUri] };
		webviewView.webview.html = this._getInitialViewHtml(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(message => {
			switch (message.id) {
				case 'generateFlowBlock': {
					if (vscode.window.activeTextEditor?.document) {
						let code = vscode.window.activeTextEditor.document.getText();

						if (code) {
							let flowBlockHtml = this.getFlowBlockHtml(code);

							webviewView.webview.html = webviewView.webview.html.replace(/(\<div\ id\=\"flow\-block\"\>).*(\<\/div\>)/s, '$1' + flowBlockHtml + '$2');
						}
					}
					break;
				}
			}
		});
	}

	public getFlowBlockHtml(code: string) {
		/* TODO */
		return code;
	}

	private _getInitialViewHtml(webview: vscode.Webview) {
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
