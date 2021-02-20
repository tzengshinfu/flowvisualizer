import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { Comment, Node } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";
import { C, D, CommentType } from '../../src/variable';

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
	it('test ForStatement', function () {
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
	it.skip('test DoWhileStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-dowhile-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_doWhile(sourceCode);
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
	it('test SwitchStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-switch-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_switch(sourceCode);
		const htmlFilePath = './src/test/test-switch-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-switch-chart.html';

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
			enterExpressionStatement(path);
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
	code = replaceTags(code);
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
			enterExpressionStatement(path);
			enterContinueStatement(path);
			enterBreakStatement(path);
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
	code = replaceTags(code);
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
			enterExpressionStatement(path);
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
	code = replaceTags(code);
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function getFlowBlockHtml_doWhile(sourceCode: string) {
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
			enterDoWhileStatement(path);
			enterExpressionStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitDoWhileStatement(path);
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = replaceTags(code);
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function getFlowBlockHtml_switch(sourceCode: string) {
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
			enterSwitchStatement(path);
			enterExpressionStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitSwitchStatement(path);
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = replaceTags(code);
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function enterProgram(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isProgram()) {
		comments = [];

		comments.push(`${C}div class="padding-5px" data-node-type="Program" data-src-file-path="./src/test/test-if-then-else.js"${D}`);
		comments.push(`${C}div class="table background-mustard border-3px-solid-silver border-rounded-50percent padding-5px alignment-outer-center"${D}🏁${C}/div${D}`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function enterIfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isIfStatement()) {
		comments = [];

		if (path.key === 'alternate') {
			comments.push(`${C}div class="background-skyblue padding-5px alignment-inner-center" data-node-type="IfAlternateHead"${D}else${C}/div${D}`);
		}

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-outer-center" data-node-type="IfStatement"${D}`); //IfStatement
		comments.push(`${C}div class="row"${D}`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isIfStatement()) {
		if (path.key === 'test') {
			comments = [];

			comments.push(`${C}div class="cell border-right-3px-solid-silver background-lavenderblush alignment-inner-top"${D}`); //IfConsequent
			comments.push(`${C}div class="background-pink padding-5px alignment-inner-center" data-node-type="IfConsequentHead" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`);
			comments.push('if (');
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'consequent') {
			comments = [];

			comments.push(`${C}div class="padding-5px alignment-inner-center" data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`);
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'alternate') {
			comments = [];

			comments.push(`${C}div class="cell background-aliceblue alignment-inner-top"${D}`); //IfAlternate
			comments.push(`${C}div class="background-skyblue padding-5px alignment-inner-center" data-node-type="IfAlternateHead"${D}else${C}/div${D}`);
			comments.push(`${C}div class="padding-5px alignment-inner-center" data-node-type="IfAlternateBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`);
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}
	}
}

function enterForStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForStatement()) {
		comments = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-outer-center" data-node-type="${path.type}"${D}`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isForStatement()) {
		if (path.key === 'init') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-pink padding-5px alignment-inner-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementHead
			comments.push('for (');
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-lavenderblush padding-5px alignment-inner-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementBody
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}
	}
}

function enterForOfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForInStatement() || path.isForOfStatement()) {
		comments = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-outer-center" data-node-type="${path.type}"${D}`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isForInStatement() || path.parentPath?.isForOfStatement()) {
		if (path.key === 'left') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-pink padding-5px alignment-inner-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementHead
			comments.push('for (');
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}div class="row"${D}`); //row
			comments.push(`${C}div class="cell background-lavenderblush padding-5px alignment-inner-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}"${D}`); //ForStatementBody
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}
	}
}

function enterDoWhileStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isDoWhileStatement()) {
		comments = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-3px-solid-silver border-rounded-3px alignment-outer-center" data-node-type="${path.type}"${D}`); //DoWhileStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isDoWhileStatement()) {
		if (path.key === 'test') {
			comments = [];

			comments.push(`${C}div class="row"${D}`);// row
			comments.push(`${C}div class="cell background-pink alignment-inner-center"${D}`);
			comments.push('while (');

			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}div class="row"${D}`);// row
			comments.push(`${C}div class="cell background-pink alignment-inner-center"${D}`);
			comments.push('do');
			comments.push(`${C}/div${D}`);
			comments.push(`${C}div class="cell background-pink"${D}`);
			comments.push(`${C}div class="rotate-270deg"${D}⤴️${C}/div${D}`);
			comments.push(`${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row

			comments.push(`${C}div class="row"${D}`);// row
			comments.push(`${C}div class="cell background-lavenderblush alignment-inner-center"${D}`); //DoWhileStatementBody
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}
	}
}

function enterExpressionStatement(path: NodePath<Node>) {
	if (path.isExpressionStatement()) {
		let comments: string[] = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function enterContinueStatement(path: NodePath<Node>) {
	if (path.isContinueStatement()) {
		let comments: string[] = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function enterBreakStatement(path: NodePath<Node>) {
	if (path.isBreakStatement()) {
		let comments: string[] = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function enterSwitchStatement(path: NodePath<Node>) {

}

function exitProgram(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isProgram()) {
		comments = [];

		comments.push(`${C}div class="table alignment-outer-center"${D}⬇️${C}/div${D}`);
		comments.push(`${C}div class="table border-rounded-50percent border-3px-solid-silver alignment-outer-center background-greenyellow padding-5px"${D}🏠${C}/div${D}`);
		comments.push(`${C}/div${D}`); //Program
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}
}

function exitIfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isIfStatement()) {
		comments = [];

		if (!path.node.alternate) {
			comments.push(`${C}div class="cell background-aliceblue alignment-inner-top"${D}`); //IfAlternative
			comments.push(`${C}div class="background-skyblue padding-5px alignment-inner-top alignment-inner-center" data-node-type="IfAlternateHead"${D}else${C}/div${D}`);
			comments.push(`${C}div class="padding-5px alignment-inner-center"${D}⬇️${C}/div${D}`);
			comments.push(`${C}div class="padding-5px alignment-inner-center" data-node-type="IfAlternateBody"${D}${C}div${D}🚪🚶${C}/div${D}${C}/div${D}`);
			comments.push(`${C}/div${D}`); //IfAlternative
		}

		comments.push(`${C}/div${D}`);
		comments.push(`${C}/div${D}`); //IfStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isIfStatement()) {
		if (path.key === 'test') {
			comments = [];

			comments.push(')');
			comments.push(`${C}/div${D}`); //IfConsequentHead
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'consequent') {
			comments = [];

			comments.push(`${C}/div${D}`); //IfConsequentBody
			comments.push(`${C}/div${D}`); //IfConsequent
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'alternate') {
			comments = [];

			comments.push(`${C}/div${D}`); //IfAlternateBody
			comments.push(`${C}/div${D}`); //IfAlternate
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}
	}
}

function exitForStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForStatement()) {
		comments = [];

		comments.push(`${C}div class="row"${D}`);// row
		comments.push(`${C}div class="cell background-pink"${D}${C}/div${D}`);
		comments.push(`${C}div class="cell background-pink"${D}⤴️${C}/div${D}`);
		comments.push(`${C}/div${D}`); //row
		comments.push(`${C}/div${D}`); //ForStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isForStatement()) {
		if (path.key === 'update') {
			comments = [];

			comments.push(')');
			comments.push(`${C}/div${D}`); //ForStatementHead
			comments.push(`${C}div class="cell background-pink"${D}`);
			comments.push(`${C}div class="rotate-270deg"${D}⤴️${C}/div${D}`);
			comments.push(`${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}/div${D}`); //ForStatementBody
			comments.push(`${C}div class="cell background-pink alignment-inner-middle"${D}🔄${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}
	}
}

function exitForOfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForInStatement() || path.isForOfStatement()) {
		comments = [];

		comments.push(`${C}div class="row"${D}`);// row
		comments.push(`${C}div class="cell background-pink"${D}${C}/div${D}`);
		comments.push(`${C}div class="cell background-pink"${D}⤴️${C}/div${D}`);
		comments.push(`${C}/div${D}`); //row
		comments.push(`${C}/div${D}`); //ForStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isForInStatement() || path.parentPath?.isForOfStatement()) {
		if (path.key === 'right') {
			comments = [];

			comments.push(')');
			comments.push(`${C}/div${D}`); //ForStatementHead
			comments.push(`${C}div class="cell background-pink"${D}`);
			comments.push(`${C}div class="rotate-270deg"${D}⤴️${C}/div${D}`);
			comments.push(`${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}/div${D}`); //ForStatementBody
			comments.push(`${C}div class="cell background-pink alignment-inner-middle"${D}🔄${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}
	}
}

function exitDoWhileStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isDoWhileStatement()) {
		comments = [];

		comments.push(`${C}/div${D}`); //DoWhileStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isDoWhileStatement()) {
		if (path.key === 'test') {
			comments = [];

			comments.push(');');
			comments.push(`${C}/div${D}`);
			comments.push(`${C}div class="cell background-pink"${D}⤴️${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row

			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });
		}
		if (path.key === 'body') {
			comments = [];

			comments.push(`${C}/div${D}`); //DoWhileStatementBody
			comments.push(`${C}div class="cell background-pink alignment-inner-middle"${D}🔄${C}/div${D}`);
			comments.push(`${C}/div${D}`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}
	}
}

function exitSwitchStatement(path: NodePath<Node>) {

}

function clearLeadingComments(path: NodePath<Node>) {
	path.node.leadingComments = null;
}

function clearTrailingComments(path: NodePath<Node>) {
	path.node.trailingComments = null;
}

function replaceTags(code: string): string {
	code = code.replace(/(\*\/)\s*if\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'if ('
	//code = code.replace(/(\*\/)\s*\)\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/(\*\/)\s*else\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'else'
	code = code.replace(/(\*\/)\s*for\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'for ('
	code = code.replace(/(\*\/)\s*do\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'do'
	code = code.replace(/(\*\/)\s*while\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'while ('
	code = code.replace(/(\*\/)\s*\)\;?\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove ')'
	code = code.replace(/&lt;/g, '<');
	code = code.replace(/&gt;/g, '>');
	code = code.replace(/\/\*/g, '');
	code = code.replace(/\*\//g, '');
	code = code.replace(/{/g, '');
	code = code.replace(/}/g, '');

	return code;
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

			pathLevel += `\n<div>${level}${path.type},parent→${path.parentPath.type},key→${path.key}`;

			if ('name' in path.node) {
				pathLevel += `,text→${path.node.name}`;
			}

			if ('operator' in path.node) {
				pathLevel += `,text→${path.node.operator}`;
			}

			if ('value' in path.node) {
				pathLevel += `,text→${path.node.value?.toString()}`;
			}
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			pathLevel += '</div>\n';
		}
	});

	return `<html><body>${pathLevel}</body></html>`;
}
