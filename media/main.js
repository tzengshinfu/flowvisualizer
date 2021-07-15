//@ts-check

(function () {
    const vscode = acquireVsCodeApi();

    document.querySelector('#generate-flow-block-button').addEventListener('click', () => {
        vscode.postMessage({ id: 'generateFlowBlock' });
    });
}());
