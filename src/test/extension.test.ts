import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { VariableDeclaration, Comment, Node } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";

describe('getFlowBlockHtml', () => {
	it('test if-then-else', () => {
		const sourceCode = fs.readFileSync('./src/test/test-if-then-else.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml(sourceCode);
		const htmlFilePath = './src/test/test-if-then-else-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-if-then-else-chart.html';

		if (fs.existsSync(htmlFilePath)) {
			fs.unlinkSync(htmlFilePath);
		}
		if (fs.existsSync(chartFilePath)) {
			fs.unlinkSync(chartFilePath);
		}

		fs.writeFileSync(htmlFilePath, flowblockHtml, 'utf8');
		fs.writeFileSync(chartFilePath, pathLevelChart, 'utf8');
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
				comments = [];
				comments.push(`${lt}div data-node-type="VariableDeclaration" style="border-width:3px;border-style:dashed;border-color:#FFAC55;padding-top: 5px;padding-right: 5px;padding-left:5px"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments = [];
				comments.push(`${lt}div data-node-type="IfStatement" style="display: table;border-width:3px;border-style:dashed;border-color:#FFAC55"${gt}`);
				comments.push(`${lt}div data-node-type="IfCondition" style="display: table-row"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments = [];
				comments.push(`${lt}div data-node-type="IfConsequent" style="display: table-cell;background-color: pink"${gt}`);
				comments.push(`${lt}div data-node-type="IfTest" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="padding-top: 5px;padding-right: 5px;padding-left:5px;"${gt}`);
				comments.push('if-statement-begin');
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'consequent') {
				comments = [];
				comments.push(`${lt}div data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="padding-top: 5px;padding-right: 5px;padding-left:5px;"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'alternate') {
				comments = [];
				comments.push(`${lt}div data-node-type="IfAlternate" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="display: table-cell;background-color: skyblue;padding-top: 5px;padding-right: 5px;padding-left:5px;"${gt}`);
				comments.push(`⤵${lt}br/ ${gt}`);
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
				comments = [];
				comments.push(`${lt}/div data-node-type="VariableDeclaration"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments = [];

				if (!path.node.alternate) {
					comments.push(`${lt}div data-node-type="IfAlternative" style="display: table-cell;background-color: skyblue"${gt}`);
					comments.push(`⤵${lt}br/ ${gt}`);
					comments.push(`passthrouth${lt}br/ ${gt}`);
					comments.push(`passthrouth${lt}br/ ${gt}`);
					comments.push(`${lt}/div data-node-type="IfAlternative"${gt}`);
				}

				comments.push(`${lt}/div data-node-type="IfCondition"${gt}`);
				comments.push(`${lt}/div data-node-type="IfStatement"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments = [];
				comments.push('if-statement-end');
				comments.push(`${lt}/div data-node-type="IfTest"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'consequent') {
				comments = [];
				comments.push(`${lt}/div data-node-type="IfConsequentBody"${gt}`);
				comments.push(`${lt}/div data-node-type="IfConsequent"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'alternate') {
				comments = [];
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
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	code = code.replace(/\/\*/g, '');
	code = code.replace(/\*\//g, '');

	/*
	//code = code.replace(/ /g, '&nbsp;');
	//code = code.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	//code = code.replace(/\n/g, '<br />');
	*/

	flowblockHtml = '<html>' + '<body>' + code + '</body>' + '</html>';

	return flowblockHtml;
}

function _getPathLevel(path: NodePath<Node>, previousLevel: string | null = null): string {
	let level = previousLevel ? previousLevel : '';

	if (path.parentPath) {
		level += '->';

		return _getPathLevel(path.parentPath, level);
	}
	else {
		return level;
	}
}

function getPathLevelChart(sourceCode: string) {
	let pathLevel = '';

	const ast = parser.parse(sourceCode);

	traverse(ast, {
		enter(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			let level = _getPathLevel(path);

			pathLevel += `\n<div>${level}${path.type},parent=${path.parentPath.type},key=${path.key}`;
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			pathLevel += '</div>\n';
		}
	});

	return pathLevel;
}
