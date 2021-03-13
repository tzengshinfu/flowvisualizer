import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { Node, BreakStatement } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";
import { C, B, CommentType, Key, PathType, JumperType } from '../../src/variable';

describe('getFlowBlockHtml', function () {
	it('test IfStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-if/test-if-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_if(sourceCode);
		const htmlFilePath = './src/test/test-if/test-if-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-if/test-if-chart.html';

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
		const sourceCode = fs.readFileSync('./src/test/test-loop/test-for-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_for(sourceCode);
		const htmlFilePath = './src/test/test-loop/test-for-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-loop/test-for-chart.html';

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
	it.skip('test ForXStatement', function () {
		const sourceCode = fs.readFileSync('./src/test/test-loop/test-forx-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_forX(sourceCode);
		const htmlFilePath = './src/test/test-loop/test-forx-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-loop/test-forx-chart.html';

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
		const sourceCode = fs.readFileSync('./src/test/test-dowhile/test-dowhile-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_doWhile(sourceCode);
		const htmlFilePath = './src/test/test-dowhile/test-dowhile-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-dowhile/test-dowhile-chart.html';

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
		const sourceCode = fs.readFileSync('./src/test/test-switch/test-switch-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_switch(sourceCode);
		const htmlFilePath = './src/test/test-switch/test-switch-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-switch/test-switch-chart.html';

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
			exitExpressionStatement(path);
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
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitForStatement(path);
			exitExpressionStatement(path);
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = replaceTags(code);
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function getFlowBlockHtml_forX(sourceCode: string) {
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
			enterForXStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitForXStatement(path);
			exitExpressionStatement(path);
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
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitDoWhileStatement(path);
			exitExpressionStatement(path);
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

			let isEnter = true;

			clearPathComments(path, isEnter);
			renderProgram(path, isEnter);
			renderSwitchStatement(path, isEnter);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			let isEnter = false;

			clearPathComments(path, isEnter);
			renderProgram(path, isEnter);
			renderSwitchStatement(path, isEnter);
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	code = replaceTags(code);
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${code}</body></html>`;

	return flowblockHtml;
}

function renderProgram(path: NodePath<Node>, isEnter: boolean) {
	let comments: string[] = [];

	if (isEnter) {
		if (path.isProgram()) {
			comments.push(`<div class="padding-5px" data-node-type="Program" data-src-file-path="./src/test/test-if-then-else.js">`);
			comments.push(`<div class="table backgroundcolor-mustard border-3px-solid-silver border-rounded-50percent padding-5px outer-alignment-center"><img class="size-20px" src="../../../media/start.png"></div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			addHtmlTags(path, comments, isEnter);

			return;
		}
	}
	else {
		if (path.isProgram()) {
			comments.push(`<div class="table border-rounded-50percent border-3px-solid-silver outer-alignment-center backgroundcolor-greenyellow padding-5px"><img class="size-20px" src="../../../media/end.png"></div>`);
			comments.push(`</div>`); //Program
			addHtmlTags(path, comments, isEnter);

			return;
		}
	}
}

function enterIfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isIfStatement()) {
		if (path.key === Key.Alternate) {
			comments.push(`<div class="backgroundcolor-skyblue padding-5px inner-alignment-center" data-node-type="IfAlternateHead">else</div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
		}

		comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center" data-node-type="IfStatement">`); //IfStatement
		comments.push(`<div class="row">`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isIfStatement()) {
		if (path.key === Key.Test) {
			comments.push(`<div class="cell border-right-3px-solid-silver backgroundcolor-lavenderblush inner-alignment-top">`); //IfConsequent
			comments.push(`<div class="backgroundcolor-pink padding-5px inner-alignment-center" data-node-type="IfConsequentHead" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`);
			comments.push('if (');
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === Key.Consequent) {
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			comments.push(`<div class="padding-5px inner-alignment-center" data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`);
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === Key.Alternate) {
			comments.push(`<div class="cell backgroundcolor-aliceblue inner-alignment-top">`); //IfAlternate
			comments.push(`<div class="backgroundcolor-skyblue padding-5px inner-alignment-center" data-node-type="IfAlternateHead">else</div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			comments.push(`<div class="padding-5px inner-alignment-center" data-node-type="IfAlternateBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`);
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}
	}
}

function exitIfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isIfStatement()) {
		if (!path.node.alternate) {
			comments.push(`<div class="cell backgroundcolor-aliceblue inner-alignment-top">`); //IfAlternative
			comments.push(`<div class="backgroundcolor-skyblue padding-5px inner-alignment-top inner-alignment-center" data-node-type="IfAlternateHead">else</div>`);
			comments.push(`<div class="padding-5px inner-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			comments.push(`<div class="padding-5px inner-alignment-center" data-node-type="IfAlternateBody"><div class="inner-text-nowrap" onmouseover="(function() { document.getElementById('${path.node.start}-exit').classList.add('move-todown'); })();" onmouseout="(function(){ document.getElementById('${path.node.start}-exit').classList.remove('move-todown'); })();"><a href="#${path.node.start}-exit" class="link-text-nounderline">🚪🚶</a></div></div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			comments.push(`</div>`); //IfAlternative
		}

		comments.push(`</div>`);
		comments.push(`</div>`); //IfStatement
		comments.push(`<div class="table outer-alignment-center" id="${path.node.start}-exit"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isIfStatement()) {
		if (path.key === 'test') {
			comments.push(')');
			comments.push(`</div>`); //IfConsequentHead
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'consequent') {
			comments.push(`</div>`); //IfConsequentBody
			comments.push(`</div>`); //IfConsequent
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'alternate') {
			comments.push(`</div>`); //IfAlternateBody
			comments.push(`</div>`); //IfAlternate
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}
	}
}

function enterForStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForStatement()) {
		comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center" data-node-type="${path.type}">`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isForStatement()) {
		if (path.key === 'init') {
			comments.push(`<div class="row">`); //row
			comments.push(`<div class="cell backgroundcolor-pink padding-5px inner-alignment-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`); //ForStatementHead
			comments.push('for (');
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments.push(`<div class="row">`); //row
			comments.push(`<div class="cell backgroundcolor-lavenderblush padding-5px inner-alignment-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`); //ForStatementBody
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		enterContinueStatement(path);
		enterBreakStatement(path);
	}
}

function exitForStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForStatement()) {
		comments.push(`<div class="row">`);// row
		comments.push(`<div class="cell backgroundcolor-pink inner-alignment-center"><div class="rotate-90degree">⤴️</div></div>`);
		comments.push(`<div class="cell backgroundcolor-pink">⤴️</div>`);
		comments.push(`</div>`); //row
		comments.push(`</div>`); //ForStatement
		comments.push(`<div class="padding-5px inner-alignment-center" id="${path.node.start}-exit"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isForStatement()) {
		if (path.key === 'update') {
			comments.push(')');
			comments.push(`</div>`); //ForStatementHead
			comments.push(`<div class="cell backgroundcolor-pink">`);
			comments.push(`<div id="${path.parentPath.node.start}-continue">`);
			comments.push(`<div class="rotate-270degree">⤴️</div>`);
			comments.push(`</div>`);
			comments.push(`</div>`);
			comments.push(`</div>`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments.push(`</div>`); //ForStatementBody
			comments.push(`<div class="cell backgroundcolor-pink inner-alignment-middle">🔄</div>`);
			comments.push(`</div>`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		exitContinueStatement(path);
		exitBreakStatement(path);
	}
}

function enterForXStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForXStatement()) {
		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
		comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center" data-node-type="${path.type}">`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isForXStatement()) {
		if (path.key === 'left') {
			comments.push(`<div class="row">`); //row
			comments.push(`<div class="cell backgroundcolor-pink padding-5px inner-alignment-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`); //ForStatementHead
			comments.push('for (');
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments.push(`<div class="row">`); //row
			comments.push(`<div class="cell backgroundcolor-lavenderblush padding-5px inner-alignment-center" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`); //ForStatementBody
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		enterContinueStatement(path);
		enterBreakStatement(path);
	}
}

function exitForXStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForXStatement()) {
		comments.push(`<div class="row">`);// row
		comments.push(`<div class="cell backgroundcolor-pink"></div>`);


		comments.push(`<div class="cell backgroundcolor-pink">⤴️</div>`);
		comments.push(`</div>`); //row
		comments.push(`</div>`); //ForStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isForXStatement()) {
		if (path.key === 'right') {
			comments.push(')');
			comments.push(`</div>`); //ForStatementHead
			comments.push(`<div class="cell backgroundcolor-pink">`);
			comments.push(`<div class="rotate-270degree">⤴️</div>`);
			comments.push(`</div>`);
			comments.push(`</div>`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments.push(`</div>`); //ForStatementBody
			comments.push(`<div class="cell backgroundcolor-pink inner-alignment-middle">🔄</div>`);
			comments.push(`</div>`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		exitContinueStatement(path);
		exitBreakStatement(path);
	}
}

function enterDoWhileStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isDoWhileStatement()) {
		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
		comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center" data-node-type="${path.type}">`); //DoWhileStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isDoWhileStatement()) {
		if (path.key === 'test') {
			comments.push(`<div class="row">`);// row
			comments.push(`<div class="cell backgroundcolor-pink inner-alignment-center">`);
			comments.push('while (');

			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === 'body') {
			comments.push(`<div class="row">`);// row
			comments.push(`<div class="cell backgroundcolor-pink inner-alignment-center">`);
			comments.push('do');
			comments.push(`</div>`);
			comments.push(`<div class="cell backgroundcolor-pink">`);
			comments.push(`<div class="rotate-270degree">⤴️</div>`);
			comments.push(`</div>`);
			comments.push(`</div>`); //row

			comments.push(`<div class="row">`);// row
			comments.push(`<div class="cell backgroundcolor-lavenderblush inner-alignment-center">`); //DoWhileStatementBody
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		enterContinueStatement(path);
		enterBreakStatement(path);
	}
}

function exitDoWhileStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isDoWhileStatement()) {
		comments.push(`</div>`); //DoWhileStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isDoWhileStatement()) {
		if (path.key === 'test') {
			comments.push(');');
			comments.push(`</div>`);
			comments.push(`<div class="cell backgroundcolor-pink">⤴️</div>`);
			comments.push(`</div>`); //row

			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });
		}
		if (path.key === 'body') {
			comments.push(`</div>`); //DoWhileStatementBody
			comments.push(`<div class="cell backgroundcolor-pink inner-alignment-middle">🔄</div>`);
			comments.push(`</div>`); //row
			comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

			return;
		}

		exitContinueStatement(path);
		exitBreakStatement(path);
	}
}

function exitExpressionStatement(path: NodePath<Node>) {
	if (path.isExpressionStatement()) {
		let comments: string[] = [];

		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}
}

function enterContinueStatement(path: NodePath<Node>) {
	if (path.isContinueStatement()) {
		let comments: string[] = [];

		let topPathType = getMatchTopPathType(path, [PathType.ForStatement, PathType.ForInStatement, PathType.ForOfStatement, PathType.WhileStatement, PathType.DoWhileStatement, PathType.LabelStatement]);

		switch (topPathType) {
			case PathType.ForInStatement:
			case PathType.ForInStatement:
			case PathType.ForOfStatement:
			case PathType.WhileStatement:
			case PathType.DoWhileStatement:
				comments.push(`<div class="table outer-alignment-center" onmouseover="(function() { document.getElementById('${path.parentPath.parentPath.node.start}-continue').classList.add('move-toleft'); })();" onmouseout="(function(){ document.getElementById('${path.parentPath.parentPath.node.start}-continue').classList.remove('move-toleft'); })();">`);
				comments.push(`<a class="link-text-nounderline text-color-green" href="#${path.parentPath.parentPath.node.start}-continue">`);
				break;

			case PathType.LabelStatement:
				break;
		}

		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function exitContinueStatement(path: NodePath<Node>) {
	if (path.isContinueStatement()) {
		let comments: string[] = [];

		comments.push(`</a>`);
		comments.push(`</div>`);
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}
}

function enterBreakStatement(path: NodePath<Node>) {
	if (path.isBreakStatement()) {
		let comments: string[] = [];
		let loopPath = path.findParent((parentPath) => { return parentPath.isForStatement() || parentPath.isForXStatement() || parentPath.isDoWhileStatement() || parentPath.isWhileStatement(); });
		let casePath = path.findParent((parentPath) => { return parentPath.isSwitchCase(); });
		let ifPath = path.findParent((parentPath) => { return parentPath.isIfStatement(); });
		let loopPathPosition = loopPath ? (loopPath.node.start as number) : 0;
		let casePathPosition = casePath ? (casePath.node.start as number) : 0;
		let ifPathPosition = ifPath ? (ifPath.node.start as number) : 0;
		let isInLoop = loopPathPosition > casePathPosition;

		//In Loop block
		if (isInLoop) {
			if (ifPathPosition < loopPathPosition) {
				(loopPath as NodePath<Node>).data = !(loopPath as NodePath<Node>).data ? { type: PathType.BreakStatement, position: (path.node.start as number) } : (loopPath as NodePath<Node>).data;
			}
		}
		//In Case block
		else {
			if (ifPathPosition < casePathPosition) {
				(casePath as NodePath<Node>).data = !(casePath as NodePath<Node>).data ? { type: PathType.BreakStatement, position: (path.node.start as number) } : (casePath as NodePath<Node>).data;
			}
		}

		comments.push(`<div class="table outer-alignment-center" onmouseover="(function() ${C} document.getElementById('${path.parentPath.parentPath.node.start}-exit').classList.add('move-todown'); ${B})();" onmouseout="(function()${C} document.getElementById('${path.parentPath.parentPath.node.start}-exit').classList.remove('move-todown'); ${B})();"><a href="#${path.parentPath.parentPath.node.start}-exit" class="link-text-nounderline text-color-red">`);
		addStartTags(path, comments);

		return;
	}
}

function exitBreakStatement(path: NodePath<Node>) {
	if (path.isBreakStatement()) {
		let comments: string[] = [];
		comments.push(`</a></div>`);
		addEndTags(path, comments);

		return;
	}
}

function renderSwitchStatement(path: NodePath<Node>, isEnter: boolean) {
	let comments: string[] = [];

	if (isEnter) {
		if (path.isSwitchStatement()) {
			comments.push(`<!-- #region switchstatement-block -->`);
			comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center">`);
			comments.push(`<!-- #region switchstatement-expression-row -->`);
			comments.push(`<div class="row">`);
			comments.push(`<!-- #region switchstatement-expression-cell -->`);
			comments.push(`<div class="cell border-3px-solid-silver backgroundcolor-pink inner-alignment-top">`);
			addHtmlTags(path, comments, isEnter);

			return;
		}

		if (path.isSwitchCase()) {
			if (path.key === 0) {
				comments.push(`</div>`);
				comments.push(`<!-- #endregion switchstatement-expression-cell -->`);
				comments.push(`</div>`);
				comments.push(`<!-- #endregion switchstatement-expression-row -->`);
				comments.push(`<!-- #region switchstatement-body-row -->`);
				comments.push(`<div class="row">`);
				comments.push(`<!-- #region switchstatement-body-cell -->`);
				comments.push(`<div class="cell border-3px-solid-silver backgroundcolor-lavenderblush inner-alignment-top">`);
				comments.push(`<!-- #region switchstatement-cases-block -->`);
				comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center">`);
				comments.push(`<!-- #region switchstatement-cases-row -->`);
				comments.push(`<div class="row">`);
			}

			comments.push(`<!-- #region switchstatement-cases-cell -->`);
			comments.push(`<div class="cell border-right-3px-solid-silver backgroundcolor-lavenderblush inner-alignment-top">`);
			comments.push(`<!-- #region switchcase-block -->`);
			comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center">`);
			comments.push(`<!-- #region switchcase-value-row -->`);
			comments.push(`<div class="row">`);
			comments.push(`<!-- #region switchcase-value-cell -->`);
			comments.push(`<div class="cell backgroundcolor-azure">`);
			addHtmlTags(path, comments, isEnter);

			return;
		}

		//switchcase body
		if (path.parentPath?.isSwitchCase() && path.key === 0) {
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-value-cell -->`);
			comments.push(`<!-- #region switchcase-placeholder-cell -->`);
			comments.push(`<div class="cell backgroundcolor-azure">`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-placeholder-cell -->`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-value-row -->`);
			comments.push(`<!-- #region switchcase-body-row -->`);
			comments.push(`<div class="row">`);
			comments.push(`<!-- #region switchcase-body-cell -->`);
			comments.push(`<div class="cell">`);
			addHtmlTags(path, comments, isEnter);

			return;
		}

		enterBreakStatement(path);
	}
	else {
		if (path.isSwitchStatement()) {
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchstatement-cases-row -->`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchstatement-cases-block -->`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchstatement-body-cell -->`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchstatement-body-row -->`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchstatement-block -->`);
			comments.push(`<div class="table outer-alignment-center" id="${path.node.start}-exit"><img class="size-20px" src="../../../media/down-arrow.png"></div>`);
			addEndTags(path, comments);

			return;
		}

		if (path.isSwitchCase()) {
			let noBreak = path.data ? (path.data as JumperType).type : '';
			let isLast = isLastSwitchCase(path);

			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-body-cell -->`);

			if (noBreak && !isLast) {
				comments.push(`<!-- #region switchcase-direction-cell -->`);
				comments.push(`<div class="cell">`);
				comments.push(`<img class="size-20px" src="../../../media/uptoright-arrow.png">`);
				comments.push(`</div>`);
				comments.push(`<!-- #endregion switchcase-direction-cell -->`);
			}

			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-body-row -->`);

			if (noBreak && !isLast) {
				comments.push(`<!-- #region switchcase-footer-row -->`);
				comments.push(`<div class="row">`);
				comments.push(`<!-- #region switchcase-footer-cell -->`);
				comments.push(`<div class="cell inner-alignment-center">`);
				comments.push(`<img class="size-20px" src="../../../media/downtoright-arrow.png">`);
				comments.push(`</div>`);
				comments.push(`<!-- #endregion switchcase-footer-cell -->`);
				comments.push(`<!-- #region switchcase-direction-cell -->`);
				comments.push(`<div class="cell">`);
				comments.push(`<img class="size-20px" src="../../../media/righttoup-arrow.png">`);
				comments.push(`</div>`);
				comments.push(`<!-- #endregion switchcase-direction-cell -->`);
				comments.push(`</div>`);
				comments.push(`<!-- #endregion switchcase-footer-row -->`);
			}

			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-block -->`);

			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchstatement-cases-cell -->`);
			addEndTags(path, comments);

			return;
		}

		exitBreakStatement(path);
	}
}

function replaceTags(code: string): string {
	code = code.replace(/(\*\/)\s*if\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'if ('
	//code = code.replace(/(\*\/)\s*\)\s*(\/\*)/g, '$1' + ' ' + '$2');
	code = code.replace(/(\*\/)\s*else\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'else'
	code = code.replace(/(\*\/)\s*for\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'for ('
	code = code.replace(/(\*\/)\s*do\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'do'
	code = code.replace(/(\*\/)\s*while\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove 'while ('
	code = code.replace(/(\*\/)\s*\)\;?\s*(\/\*)/g, '$1' + ' ' + '$2'); //remove ')'
	code = code.replace(/{/g, '');
	code = code.replace(/}/g, '');
	code = code.replace(/%7B/g, '{');
	code = code.replace(/%7D/g, '}');
	code = code.replace(/\/\*/g, '');
	code = code.replace(/\*\//g, '');
	//code = code.replace(/{/g, '');
	//code = code.replace(/}/g, '');

	return code;
}

function getMatchTopPathType(path: NodePath<Node>, topPathTypeList: string[]): string {
	if (!path.parentPath) {
		return path.type;
	}
	else if (topPathTypeList.includes(path.parentPath.type)) {
		return path.parentPath.type;
	}
	else {
		return getMatchTopPathType(path.parentPath, topPathTypeList);
	}
}

function getPathLevel(path: NodePath<Node>, previousLevel: string | null = null): string {
	let level = previousLevel ? previousLevel : '';

	if (path.parentPath) {
		level += '->';

		return getPathLevel(path.parentPath, level);
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

			let level = getPathLevel(path);

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

function isLastSwitchCase(path: NodePath<Node>) {
	if (path.key === (path.container as Node[]).length - 1) {
		return true;
	}

	return false;
}

function clearPathComments(path: NodePath<Node>, isEnter: boolean = true) {
	if (isEnter) {
		path.node.leadingComments = null;
	}
	else {
		path.node.trailingComments = null;
	}
}

function addHtmlTags(path: NodePath<Node>, comments: string[], isEnter: boolean = true) {
	if (isEnter) {
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });
	}
	else {
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });
	}
}