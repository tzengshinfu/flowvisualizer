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

	const lt = '&lt;';
	const gt = '&gt;';
	const ast = parser.parse(sourceCode);

	traverse(ast, {
		enter(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			path.node.leadingComments = null;
			let comments: string[] = [];
			const commentType = 'leading';

			if (path.isVariableDeclaration()) {
				comments.push(`${lt}div data-node-type="VariableDeclaration"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments.push(`${lt}div data-node-type="IfStatement"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments.push(`${lt}div data-node-type="IfConsequent" style="background-color: pink"${gt}`);
				comments.push(`${lt}div data-node-type="IfTest" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${gt}`);
				comments.push('if-statement-begin');
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'consequent') {
				//comments.push('remove-end');
				comments.push(`${lt}div data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'alternate') {
				comments.push(`${lt}div data-node-type="IfAlternate" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="background-color: skyblue"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			path.node.trailingComments = null;
			let comments: string[] = [];
			const commentType = 'trailing';

			if (path.isVariableDeclaration()) {
				comments.push(`${lt}/div data-node-type="VariableDeclaration"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				if (!path.node.alternate) {
					comments.push(`${lt}div data-node-type="IfAlternative" style="background-color: skyblue"${gt}`);
					comments.push(`passthrouth${lt}br/ ${gt}`);
					comments.push(`passthrouth${lt}br/ ${gt}`);
					comments.push(`passthrouth${lt}br/ ${gt}`);
					comments.push(`${lt}/div data-node-type="IfAlternative"${gt}`);
				}

				comments.push(`${lt}/div data-node-type="IfStatement"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments.push('if-statement-end');
				comments.push(`${lt}/div data-node-type="IfTest"${gt}`);
				//comments.push('remove-begin');
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'consequent') {
				comments.push(`${lt}/div data-node-type="IfConsequentBody"${gt}`);
				comments.push(`${lt}/div data-node-type="IfConsequent"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'alternate') {
				comments.push(`${lt}/div data-node-type="IfAlternate"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = code.replace(/(\*\/)\s*if\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/(\*\/)\s*\)\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/\/\*if-statement-begin\*\//g, 'if (');
	code = code.replace(/ \/\*if-statement-end\*\//g, ')');
	code = code.replace(/\*\/\s*else\s*\/\*/g, ' ');
	//code = code.replace(/ /g, '&nbsp;');
	//code = code.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	//code = code.replace(/\n/g, '<br />');
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	code = code.replace(/\/\*/g, '');
	code = code.replace(/\*\//g, '');
	flowblockHtml = '<html>' + '<body>' + code + '</body>' + '</html>';

	return flowblockHtml;
}
