import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { VariableDeclaration, Comment, Node } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";

describe('getFlowBlockHtml', function () {
	it.skip('test IfStatement', function () {
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
	it.skip('test ForStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-for-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_for(sourceCode);
		const htmlFilePath = './src/test/test-for-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-for-chart.html';

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
	it.skip('test ForOfStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-forof-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_forOf(sourceCode);
		const htmlFilePath = './src/test/test-forof-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-forof-chart.html';

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
	it('test DoWhileStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-dowhile-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_forOf(sourceCode);
		const htmlFilePath = './src/test/test-dowhile-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-dowhile-chart.html';

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

function getFlowBlockHtml_if(sourceCode: string) {
	let flowblockHtml = '';
	const ast = parser.parse(sourceCode);
	const style = fs.readFileSync('./media/main.css', 'utf8');

	traverse(ast, {
		enter(path) {
			if (path.isFile()) {
				return;
			}

			clearLeadingComments(path);
			enterProgram(path);
			enterIfStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitIfStatement(path);
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
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function getFlowBlockHtml_for(sourceCode: string) {
	let flowblockHtml = '';
	const ast = parser.parse(sourceCode);
	const style = fs.readFileSync('./media/main.css', 'utf8');

	traverse(ast, {
		enter(path) {
			if (path.isFile()) {
				return;
			}

			clearLeadingComments(path);
			enterProgram(path);
			enterForStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitForStatement(path);
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = code.replace(/(\*\/)\s*for\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/(\*\/)\s*\)\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/\/\*for-statement-begin\*\//g, 'for (');
	code = code.replace(/ \/\*for-statement-end\*\//g, ')');
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	code = code.replace(/\/\*/g, '');
	code = code.replace(/\*\//g, '');
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function getFlowBlockHtml_forOf(sourceCode: string) {
	let flowblockHtml = '';
	const ast = parser.parse(sourceCode);
	const style = fs.readFileSync('./media/main.css', 'utf8');

	traverse(ast, {
		enter(path) {
			if (path.isFile()) {
				return;
			}

			clearLeadingComments(path);
			enterProgram(path);
			enterForOfStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitForOfStatement(path);
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = code.replace(/(\*\/)\s*for\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/(\*\/)\s*\)\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/\/\*for-statement-begin\*\//g, 'for (');
	code = code.replace(/ \/\*for-statement-end\*\//g, ')');
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	code = code.replace(/\/\*/g, '');
	code = code.replace(/\*\//g, '');
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function enterProgram(path: NodePath<Node>) {
	const commentType = 'leading';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isProgram()) {
		comments = [];

		comments.push(`${C}div class="padding-5px" data-node-type="Program" data-src-file-path="./src/test/test-if-then-else.js"${D}`);
		comments.push(`${C}div class="table background-mustard border-3px-solid-silver border-rounded-50percent padding-5px alignment-parent-center"${D}🏁${C}/div${D}`);
		comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}
}

function enterIfStatement(path: NodePath<Node>) {
	const commentType = 'leading';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isIfStatement()) {
		comments = [];
		
		comments.push(`${C}div class="table alignment-parent-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-parent-center" data-node-type="IfStatement"${D}`); //IfStatement
		comments.push(`${C}div class="row"${D}`);
		comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}

	if (path.parentPath?.isIfStatement()) {
		if (path.key === 'test') {
			comments = [];
			comments.push(`${C}div class="cell border-right-3px-solid-silver background-lavenderblush alignment-inner-top"${D}`); //IfConsequent
			comments.push(`${C}div class="background-pink padding-5px" data-node-type="IfConsequentHead" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`);
			comments.push('if-statement-begin');
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'consequent') {
			comments = [];
			comments.push(`${C}div class="padding-5px" data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`);
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'alternate') {
			comments = [];
			comments.push(`${C}div class="cell background-aliceblue alignment-inner-top"${D}`); //IfAlternate
			comments.push(`${C}div class="background-skyblue padding-5px" data-node-type="IfAlternateHead"${D}else↘️${C}/div${D}`);
			comments.push(`${C}div class="padding-5px" data-node-type="IfAlternateBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`);
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}
	}
}

function enterForStatement(path: NodePath<Node>) {
	const commentType = 'leading';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isForStatement()) {
		comments = [];
		
		comments.push(`${C}div class="table alignment-parent-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-parent-center" data-node-type="${path.type}"${D}`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}

	if (path.parentPath?.isForStatement()) {
		if (path.key === 'init') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-pink padding-5px" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementHead
			comments.push('for-statement-begin');
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-lavenderblush padding-5px" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementBody
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}
	}
}

function enterForOfStatement(path: NodePath<Node>) {
	const commentType = 'leading';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isForInStatement() || path.isForOfStatement()) {
		comments = [];

		comments.push(`${C}div class="table alignment-parent-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-parent-center" data-node-type="${path.type}"${D}`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}

	if (path.parentPath?.isForInStatement() || path.parentPath?.isForOfStatement()) {
		if (path.key === 'left') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-pink padding-5px" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementHead
			comments.push('for-statement-begin');
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-lavenderblush padding-5px" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementBody
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}
	}
}

function exitProgram(path: NodePath<Node>) {
	const commentType = 'trailing';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isProgram()) {
		comments = [];

		comments.push(`${C}div class="table alignment-parent-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-rounded-50percent border-3px-solid-silver alignment-parent-center background-greenyellow padding-5px"${D}🏠${C}/div${D}`);
		comments.push(`${C}/div${D}`); //Program
		comments.forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}
}

function exitIfStatement(path: NodePath<Node>) {
	const commentType = 'trailing';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isIfStatement()) {
		comments = [];

		if (!path.node.alternate) {
			comments.push(`${C}div class="cell background-aliceblue alignment-inner-top"${D}`); //IfAlternative
			comments.push(`${C}div class="background-skyblue padding-5px alignment-inner-top" data-node-type="IfAlternateHead"${D}else↘️${C}/div${D}`);
			comments.push(`${C}div class="padding-5px" style="text-align:right;" data-node-type="IfAlternateBody"${D}${C}div${D}🚪🚶${C}/div${D}${C}/div${D}`);
			comments.push(`${C}/div${D}`); //IfAlternative
		}

		comments.push(`${C}/div${D}`);
		comments.push(`${C}/div${D}`); //IfStatement
		comments.forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}

	if (path.parentPath?.isIfStatement()) {
		if (path.key === 'test') {
			comments = [];

			comments.push('if-statement-end');
			comments.push(`${C}/div${D}`); //IfConsequentHead
			comments.forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'consequent') {
			comments = [];

			comments.push(`${C}/div${D}`); //IfConsequentBody
			comments.push(`${C}/div${D}`); //IfConsequent
			comments.forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'alternate') {
			comments = [];

			comments.push(`${C}/div${D}`); //IfAlternateBody
			comments.push(`${C}/div${D}`); //IfAlternate
			comments.forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}
	}
}

function exitForStatement(path: NodePath<Node>) {
	const commentType = 'trailing';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isForStatement()) {
		comments = [];

		comments.push(`${C}div class="row"${D}`);// row
		comments.push(`${C}div class="cell background-pink"${D}${C}/div${D}`);
		comments.push(`${C}div class="cell background-pink"${D}⤴️${C}/div${D}`);
		comments.push(`${C}/div${D}`); //row
		comments.push(`${C}/div${D}`); //ForStatement
		comments.push(`${C}div class="table alignment-parent-center"${D}⬇️${C}/div${D}`);
		comments.forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}

	if (path.parentPath?.isForStatement()) {
		if (path.key === 'update') {
			comments = [];

			comments.push('for-statement-end');
			comments.push(`${C}/div${D}`); //ForStatementHead
			comments.push(`${C}div class="cell background-pink"${D}`);
			comments.push(`${C}div class="rotate-270deg"${D}⤴️${C}/div${D}`);
			comments.push(`${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}/div${D}`); //ForStatementBody
			comments.push(`${C}div class="cell background-pink alignment-inner-middle"${D}🔄${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}
	}
}

function exitForOfStatement(path: NodePath<Node>) {
	const commentType = 'trailing';
	let comments: string[] = [];
	const C = '&lt;'; //because C looks like '<'
	const D = '&gt;'; //because D looks like '>'

	if (path.isForInStatement() || path.isForOfStatement()) {
		comments = [];

		comments.push(`${C}div class="row"${D}`);// row
		comments.push(`${C}div class="cell background-pink"${D}${C}/div${D}`);
		comments.push(`${C}div class="cell background-pink"${D}⤴️${C}/div${D}`);
		comments.push(`${C}/div${D}`); //row
		comments.push(`${C}/div${D}`); //ForStatement
		comments.push(`${C}div class="table alignment-parent-center"${D}⬇️${C}/div${D}`);
		comments.forEach((comment) => { path.addComment(commentType, comment, false); });

		return;
	}

	if (path.parentPath?.isForInStatement() || path.parentPath?.isForOfStatement()) {
		if (path.key === 'right') {
			comments = [];

			comments.push('for-statement-end');
			comments.push(`${C}/div${D}`); //ForStatementHead
			comments.push(`${C}div class="cell background-pink"${D}`);
			comments.push(`${C}div class="rotate-270deg"${D}⤴️${C}/div${D}`);
			comments.push(`${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];
			
			comments.push(`${C}/div${D}`); //ForStatementBody
			comments.push(`${C}div class="cell background-pink alignment-inner-middle"${D}🔄${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.reverse().forEach((comment) => { path.addComment(commentType, comment, false); });

			return;
		}
	}
}

function clearLeadingComments(path: NodePath<Node>) {
	path.node.leadingComments = null;
}

function clearTrailingComments(path: NodePath<Node>) {
	path.node.trailingComments = null;
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