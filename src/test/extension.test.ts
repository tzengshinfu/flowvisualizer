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

	const C = '&lt;'; //because C looks like <
	const D = '&gt;'; //because D looks like >
	const ast = parser.parse(sourceCode);
	const style = fs.readFileSync('./media/main.css', 'utf8');

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
				comments.push(`${C}div data-node-type="Program" data-src-file-path="./src/test/test-if-then-else.js" style="border-radius: 3px;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px"${D}`);
				comments.push(`${C}div class="table border-3px-rounded-gray" style="border-radius: 50%;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px;padding-bottom:5px;margin: 0 auto;background-color: ${Color.Mustard}"${D}🏁${C}/div${D}`);
				comments.push(`${C}div style="display: table;margin: 0 auto;margin-bottom:2px"${D}⬇️${C}/div${D}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isVariableDeclaration()) {
				comments = [];
				comments.push(`${C}div data-node-type="VariableDeclaration" style="display: table;border:groove;border-radius: 3px;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px;;margin: 0 auto;background-color: ${Color.Lemon}"${D}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments = [];
				var alignBottom = _getPathLevel(path) !== '->' ? ';margin-bottom:-3px;margin-right:-7px;' : '';
				comments.push(`${C}div data-node-type="IfStatement" style="display: table;border-radius: 3px;border-width:3px;border-style:solid;border-color:${Color.Silver};margin: 0 auto${alignBottom}"${D}`);
				comments.push(`${C}div data-node-type="IfCondition" style="display: table-row;"${D}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments = [];
				comments.push(`${C}div data-node-type="IfConsequent" style="display: table-cell;background-color: PaleVioletRed;border-right:3px solid silver"${D}`);
				comments.push(`${C}div data-node-type="IfTest" style="background-color: pink" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="padding-top: 5px;padding-right: 5px;padding-left:5px;"${D}`);
				comments.push('if-statement-begin');
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'consequent') {
				comments = [];
				comments.push(`${C}div data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="padding-top: 5px;padding-right: 5px;padding-left:5px;"${D}`);
				comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'alternate') {
				comments = [];
				comments.push(`${C}div data-node-type="IfAlternate" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}" style="display: table-cell;background-color: ${Color.Skyblue};padding-top: 5px;padding-right: 5px;padding-left:5px;"${D}`);
				comments.push(`${C}div${D}else↘️${C}/div${D}`);
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
				comments.push(`${C}div style="display: table;border-radius: 50%;border-width:3px;border-style:solid;border-color:${Color.Silver};padding-top: 5px;padding-right: 5px;padding-left:5px;padding-bottom:5px;margin: 0 auto;background-color: ${Color.Greenyellow}"${D}🏠${C}/div${D}`);
				comments.push(`${C}/div data-node-type="Program"${D}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isVariableDeclaration()) {
				comments = [];
				comments.push(`${C}/div data-node-type="VariableDeclaration"${D}`);
				comments.push(`${C}div style="display: table;margin: 0 auto;margin-bottom:2px"${D}⬇️${C}/div${D}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.isIfStatement()) {
				comments = [];

				if (!path.node.alternate) {
					comments.push(`${C}div data-node-type="IfAlternative" style="display: table-cell;background-color: ${Color.Skyblue}"${D}`);
					comments.push(`${C}div${D}else↘️${C}/div${D}`);
					comments.push(`${C}div style="text-align:right;"${D}${C}div${D}🚪🚶${C}/div${D}${C}/div${D}`);
					comments.push(`${C}/div data-node-type="IfAlternative"${D}`);
				}

				comments.push(`${C}/div data-node-type="IfCondition"${D}`);
				comments.push(`${C}/div data-node-type="IfStatement"${D}`);

				if (_getPathLevel(path) === '->') {
					comments.push(`${C}div style="display: table;margin: 0 auto;margin-bottom:2px"${D}⬇️${C}/div${D}`);
				}

				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'test') {
				comments = [];
				comments.push('if-statement-end');
				comments.push(`${C}/div data-node-type="IfTest"${D}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'consequent') {
				comments = [];
				comments.push(`${C}/div data-node-type="IfConsequentBody"${D}`);
				comments.push(`${C}/div data-node-type="IfConsequent"${D}`);
				comments.forEach((comment) => { path.addComment(commentType, comment, false); });
			}

			if (path.key === 'alternate') {
				comments = [];
				comments.push(`${C}/div data-node-type="IfAlternate"${D}`);
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

	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

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