import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { VariableDeclaration, Comment, Node } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";

describe('getFlowBlockHtml', function () {
	it('test if', function () {
		const sourceCode = fs.readFileSync('./src/test/test-if-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_if(sourceCode);
		const htmlFilePath = './src/test/test-if-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-if-chart.html';

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
	it.skip('test loop', function () {
		const sourceCode = fs.readFileSync('./src/test/test-loop-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_loop(sourceCode);
		const htmlFilePath = './src/test/test-loop-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-loop-chart.html';

		if (fs.existsSync(htmlFilePath)) {
			fs.unlinkSync(htmlFilePath);
		}
		if (fs.existsSync(chartFilePath)) {
			fs.unlinkSync(chartFilePath);
		}

		fs.writeFileSync(htmlFilePath, 'flowblockHtml', 'utf8');
		fs.writeFileSync(chartFilePath, pathLevelChart, 'utf8');
		assert.equal(fs.existsSync(htmlFilePath), true);
	});
});

function getFlowBlockHtml_if(sourceCode: string) {
	let flowblockHtml = '';

	const lt = '&lt;';
	const gt = '&gt;';
	const ast = parser.parse(sourceCode);

	traverse(ast, {
		enter(path) {
			if (path.isFile()) {
				return;
			}

			path.node.leadingComments = null;
			let comments: string[] = [];
			const commentType = 'leading';

			if (path.isProgram()) {
				comments = [];
				comments.push(`${lt}div data-node-type="Program" data-src-file-path="./src/test/test-if-then-else.js" style="border-radius: 3px;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px"${gt}`);
				comments.push(`${lt}div style="display: table;border-radius: 50%;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px;padding-bottom:5px;margin: 0 auto;background-color: ${Color.Mustard}"${gt}🏁${lt}/div${gt}`);
				comments.push(`${lt}div style="display: table;margin: 0 auto"${gt}⬇️${lt}/div${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isVariableDeclaration()) {
				comments = [];
				comments.push(`${lt}div data-node-type="VariableDeclaration" style="display: table;border:groove;border-radius: 3px;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px;;margin: 0 auto;background-color: ${Color.Lemon}"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments = [];
				var alignBottom = _getPathLevel(path) !== '->' ? ';margin-bottom:-3px;' : '';
				comments.push(`${lt}div data-node-type="IfStatement" style="display: table;border-radius: 3px;border-width:3px;border-style:solid;border-color:${Color.Silver};margin: 0 auto${alignBottom}"${gt}`);
				comments.push(`${lt}div data-node-type="IfCondition" style="display: table-row"${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments = [];
				comments.push(`${lt}div data-node-type="IfConsequent" style="display: table-cell;background-color: PaleVioletRed"${gt}`);
				comments.push(`${lt}div data-node-type="IfTest" style="background-color: pink" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="padding-top: 5px;padding-right: 5px;padding-left:5px;"${gt}`);
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
				comments.push(`${lt}div data-node-type="IfAlternate" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="display: table-cell;background-color: ${Color.Skyblue};padding-top: 5px;padding-right: 5px;padding-left:5px;"${gt}`);
				comments.push(`${lt}div${gt}else↘️${lt}/div${gt}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			path.node.trailingComments = null;
			let comments: string[] = [];
			const commentType = 'trailing';

			if (path.isProgram()) {
				comments = [];
				comments.push(`${lt}div style="display: table;border-radius: 50%;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px;padding-bottom:5px;margin: 0 auto;background-color: ${Color.Greenyellow}"${gt}🏠${lt}/div${gt}`);
				comments.push(`${lt}/div data-node-type="Program"${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isVariableDeclaration()) {
				comments = [];
				comments.push(`${lt}/div data-node-type="VariableDeclaration"${gt}`);
				comments.push(`${lt}div style="display: table;margin: 0 auto"${gt}⬇️${lt}/div${gt}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments = [];

				if (!path.node.alternate) {
					comments.push(`${lt}div data-node-type="IfAlternative" style="display: table-cell;background-color: ${Color.Skyblue}"${gt}`);
					comments.push(`${lt}div${gt}else↘️${lt}/div${gt}`);
					comments.push(`${lt}div style="text-align:right;"${gt}${lt}div${gt}🚪🚶${lt}/div${gt}${lt}/div${gt}`);
					comments.push(`${lt}/div data-node-type="IfAlternative"${gt}`);
				}

				comments.push(`${lt}/div data-node-type="IfCondition"${gt}`);
				comments.push(`${lt}/div data-node-type="IfStatement"${gt}`);

				if (_getPathLevel(path) === '->') {
					comments.push(`${lt}div style="display: table;margin: 0 auto"${gt}⬇️${lt}/div${gt}`);
				}

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

function getFlowBlockHtml_loop(sourceCode: string) {

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

enum Color {
	Silver = '#c0c0c0',
	Pink = '#FFC0CB',
	Skyblue = '#87CEEB',
	Greenyellow = '#9ACD32',
	Lemon = '#fff700',
	Mustard = '#FFDB58',
}