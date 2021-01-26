import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { VariableDeclaration, Comment } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";

describe('getFlowBlockHtml', () => {
	it('test if-then-else', () => {
		const sourceCode = fs.readFileSync('./src/test/test-if-then-else.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml(sourceCode);
		const htmlFilePath = './src/test/test-if-then-else-result.html';

		if (fs.existsSync(htmlFilePath)) {
			fs.unlinkSync(htmlFilePath);
		}

		fs.writeFileSync(htmlFilePath, flowblockHtml, 'utf8');
		assert.equal(fs.existsSync(htmlFilePath), true);
	});
});

function getFlowBlockHtml(sourceCode: string) {
	let flowblockHtml = '';

	const ast = parser.parse(sourceCode);

	traverse(ast, {
		enter(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			path.node.leadingComments = null;
			let comments: string[] = [];
			const commentType = 'leading';

			if (path.isIfStatement()) {
				comments.push('&lt;div data-node-type="IfStatement"&gt;');

				if (!path.node.alternate) {
					comments.push('&lt;span data-node-type="IfAlternative"&gt;');
					comments.push('passthrouth');
					comments.push('&lt;/span data-node-type="IfAlternative"&gt;');
				}

				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, true); });
			}

			if (path.key === 'test') {
				comments.push('&lt;span data-node-type="IfConsequent"&gt;');
				comments.push('&lt;div data-node-type="IfTest" data-node-loc-line="' + path.node!.loc!.start.line + '" data-node-loc-column="' + path.node!.loc!.start.column + '"&gt;');
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, true); });
			}

			if (path.key === 'consequent') {
				comments.push('&lt;div data-node-type="IfConsequentBody" data-node-loc-line="' + path.node!.loc!.start.line + '" data-node-loc-column="' + path.node!.loc!.start.column + '"&gt;');
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, true); });
			}

			if (path.key === 'alternate') {
				comments.push('&lt;span data-node-type="IfAlternative" data-node-loc-line="' + path.node!.loc!.start.line + '" data-node-loc-column="' + path.node!.loc!.start.column + '"&gt;');
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, true); });
			}
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			path.node.trailingComments = null;
			let comments: string[] = [];
			const commentType = 'trailing';

			if (path.isIfStatement()) {
				comments.push('&lt;/div data-node-type="IfStatement"&gt;');
				comments.forEach((comment) => { path.addComment(commentType, comment, true); });
			}

			if (path.key === 'test') {
				comments.push('&lt;/div data-node-type="IfTest"&gt;');
				comments.forEach((comment) => { path.addComment(commentType, comment, true); });
			}

			if (path.key === 'consequent') {
				comments.push('&lt;/div data-node-type="IfConsequentBody"&gt;');
				comments.push('&lt;/span data-node-type="IfConsequent"&gt;');
				comments.forEach((comment) => { path.addComment(commentType, comment, true); });
			}

			if (path.key === 'alternate') {
				comments.push('&lt;/span data-node-type="IfAlternative"&gt;');
				comments.forEach((comment) => { path.addComment(commentType, comment, true); });
			}
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	let code1 = code.replace(/ /g, '&nbsp;');
	let code2 = code1.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	let code3 = code2.replace(/\n/g, '<br />');
	//let code4 = code3.replace(/\/*&lt;/g, '<');
	//let code5 = code4.replace(/&gt;*\//g, '>');
	flowblockHtml = '<html>' + '<body>' + code3 + '</body>' + '</html>';

	return flowblockHtml;
}
