import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { Comment, Node, SwitchStatement } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";
import { C, D, CommentType, Key, PathType } from '../../src/variable';

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

			clearLeadingComments(path);
			enterProgram(path);
			enterSwitchStatement(path);
		},
		exit(path) {
			if (path.isFile()) {
				return;
			}

			clearTrailingComments(path);
			exitProgram(path);
			exitSwitchStatement(path);
			//exitExpressionStatement(path);
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
		comments.push(`<div class="padding-5px" data-node-type="Program" data-src-file-path="./src/test/test-if-then-else.js">`);
		comments.push(`<div class="table backgroundcolor-mustard border-3px-solid-silver border-rounded-50percent padding-5px outer-alignment-center"><img class="size-20px" src="../../media/start.png"></div>`);
		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function exitProgram(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isProgram()) {
		comments.push(`<div class="table border-rounded-50percent border-3px-solid-silver outer-alignment-center backgroundcolor-greenyellow padding-5px"><img class="size-20px" src="../../media/end.png"></div>`);
		comments.push(`</div>`); //Program
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}
}

function enterIfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isIfStatement()) {
		if (path.key === Key.Alternate) {
			comments.push(`<div class="backgroundcolor-skyblue padding-5px inner-alignment-center" data-node-type="IfAlternateHead">else</div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
			comments.push(`<div class="padding-5px inner-alignment-center" data-node-type="IfConsequentBody" data-node-loc-line="${path.node!.loc!.start.line}" data-node-loc-column="${path.node!.loc!.start.column}">`);
			comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

			return;
		}

		if (path.key === Key.Alternate) {
			comments.push(`<div class="cell backgroundcolor-aliceblue inner-alignment-top">`); //IfAlternate
			comments.push(`<div class="backgroundcolor-skyblue padding-5px inner-alignment-center" data-node-type="IfAlternateHead">else</div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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
			comments.push(`<div class="padding-5px inner-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
			comments.push(`<div class="padding-5px inner-alignment-center" data-node-type="IfAlternateBody"><div class="inner-text-nowrap" onmouseover="(function() { document.getElementById('${path.node.start}-exit').classList.add('move-todown'); })();" onmouseout="(function(){ document.getElementById('${path.node.start}-exit').classList.remove('move-todown'); })();"><a href="#${path.node.start}-exit" class="link-text-nounderline">🚪🚶</a></div></div>`);
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
			comments.push(`</div>`); //IfAlternative
		}

		comments.push(`</div>`);
		comments.push(`</div>`); //IfStatement
		comments.push(`<div class="table outer-alignment-center" id="${path.node.start}-exit"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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
			comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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
		comments.push(`<div class="padding-5px inner-alignment-center" id="${path.node.start}-exit"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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

function enterForOfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForInStatement() || path.isForOfStatement()) {
		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
		comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center" data-node-type="${path.type}">`); //ForStatement
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	if (path.parentPath?.isForInStatement() || path.parentPath?.isForOfStatement()) {
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

function exitForOfStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isForInStatement() || path.isForOfStatement()) {
		comments.push(`<div class="row">`);// row
		comments.push(`<div class="cell backgroundcolor-pink"></div>`);


		comments.push(`<div class="cell backgroundcolor-pink">⤴️</div>`);
		comments.push(`</div>`); //row
		comments.push(`</div>`); //ForStatement
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath?.isForInStatement() || path.parentPath?.isForOfStatement()) {
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
		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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

		comments.push(`<div class="table outer-alignment-center"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
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
		let topPathType = getMatchTopPathType(path, [PathType.ForStatement, PathType.ForInStatement, PathType.ForOfStatement, PathType.WhileStatement, PathType.DoWhileStatement, PathType.LabelStatement, PathType.SwitchCase]);

		switch (topPathType) {
			case PathType.ForInStatement:
			case PathType.ForInStatement:
			case PathType.ForOfStatement:
			case PathType.WhileStatement:
			case PathType.DoWhileStatement:
				comments.push(`<div class="table outer-alignment-center" onmouseover="(function() { document.getElementById('${path.parentPath.parentPath.node.start}-exit').classList.add('move-todown'); })();" onmouseout="(function(){ document.getElementById('${path.parentPath.parentPath.node.start}-exit').classList.remove('move-todown'); })();"><a href="#${path.parentPath.parentPath.node.start}-exit" class="link-text-nounderline text-color-red">`);
				break;

			case PathType.LabelStatement:
				break;

			case PathType.SwitchCase:
				break;
		}

		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}
}

function exitBreakStatement(path: NodePath<Node>) {
	if (path.isBreakStatement()) {
		let comments: string[] = [];

		let topPathType = getMatchTopPathType(path, [PathType.ForStatement, PathType.ForInStatement, PathType.ForOfStatement, PathType.WhileStatement, PathType.DoWhileStatement, PathType.LabelStatement, PathType.SwitchCase]);

		switch (topPathType) {
			case PathType.ForInStatement:
			case PathType.ForInStatement:
			case PathType.ForOfStatement:
			case PathType.WhileStatement:
			case PathType.DoWhileStatement:
				comments.push(`</a></div>`);
				break;

			case PathType.LabelStatement:
				break;

			case PathType.SwitchCase:
				break;
		}


		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}
}

function enterSwitchStatement(path: NodePath<Node>) {
	let comments: string[] = [];

	if (path.isSwitchStatement()) {
		comments.push(`<!-- #region switchstatement-block -->`);
		comments.push(`<div class="table border-3px-solid-silver border-rounded-3px outer-alignment-center">`);
		comments.push(`<!-- #region switchstatement-expression-row -->`);
		comments.push(`<div class="row">`);
		comments.push(`<!-- #region switchstatement-expression-cell -->`);
		comments.push(`<div class="cell border-3px-solid-silver backgroundcolor-pink inner-alignment-top">`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

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
		comments.push(`<div class="cell">`);
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });

		return;
	}

	//enterBreakStatement(path);
}

function exitSwitchStatement(path: NodePath<Node>) {
	let comments: string[] = [];

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
		comments.push(`<div class="table outer-alignment-center" id="${path.node.start}-exit"><img class="size-20px" src="../../media/down-arrow.png"></div>`);
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.isSwitchCase()) {
		let noBreak = hasNoBreakStatement(path);

		comments.push(`</div>`);
		comments.push(`<!-- #endregion switchcase-body-cell -->`);

		let isLast = isLastSwitchCase(path);

		if (noBreak && !isLast) {
			comments.push(`<!-- #region switchcase-direction-cell -->`);
			comments.push(`<div class="cell">`);
			comments.push(`<img class="size-20px" src="../../media/uptoright-arrow.png">`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-direction-cell -->`);
		}

		comments.push(`</div>`);
		comments.push(`<!-- #endregion switchcase-body-row -->`);

		if (noBreak && !isLast) {
			comments.push(`<!-- #region switchcase-footer-row -->`);
			comments.push(`<div class="row">`);
			comments.push(`<!-- #region switchcase-footer-cell -->`);
			comments.push(`<div class="cell">`);
			comments.push(`<img class="size-20px" src="../../media/downtoright-arrow.png">`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-footer-cell -->`);

			comments.push(`<!-- #region switchcase-direction-cell -->`);
			comments.push(`<div class="cell">`);
			comments.push(`<img class="size-20px" src="../../media/righttoup-arrow.png">`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-direction-cell -->`);

			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-footer-row -->`);
		}

		comments.push(`</div>`);
		comments.push(`<!-- #endregion switchcase-block -->`);
		comments.push(`</div>`);
		comments.push(`<!-- #endregion switchstatement-cases-cell -->`);
		// comments.push(`<!-- #region switchcase-direction-cell -->`);
		// comments.push(`<div class="cell">2</div>`);
		// comments.push(`<!-- #endregion switchcase-direction-cell -->`);
		// comments.push(`</div>`);
		// comments.push(`<!-- #endregion switchcase-body-row -->`);
		// comments.push(`<!-- #region switchcase-footer-row -->`);
		// comments.push(`<div class="row">`);
		// comments.push(`<!-- #region switchcase-footer-cell -->`);
		// comments.push(`<div class="cell">blank</div>`);
		// comments.push(`<!-- #region switchcase-footer-cell -->`);
		// comments.push(`<!-- #region switchcase-direction-cell -->`);
		// comments.push(`<div class="cell">3</div>`);
		// comments.push(`<!-- #region switchcase-direction-cell -->`);
		// comments.push(`</div>`);
		// comments.push(`<!-- #endregion switchcase-footer-row -->`);

		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	if (path.parentPath.isSwitchCase() && path.key === Key.Test) {
		let noBreak = hasNoBreakStatement(path.parentPath);

		let isLast = isLastSwitchCase(path.parentPath);

		comments.push(`</div>`);
		comments.push(`<!-- #endregion switchcase-value-cell -->`);

		if (noBreak && !isLast) {
			comments.push(`<!-- #region switchcase-placeholder-cell -->`);
			comments.push(`<div class="cell">`);
			//comments.push(`<img class="size-20px" src="../../media/uptoright-arrow.png">`);
			comments.push(`</div>`);
			comments.push(`<!-- #endregion switchcase-placeholder-cell -->`);
		}

		comments.push(`</div>`);
		comments.push(`<!-- #endregion switchcase-value-row -->`);

		comments.push(`<!-- #region switchcase-body-row -->`);
		comments.push(`<div class="row">`);
		comments.push(`<!-- #region switchcase-body-cell -->`);
		comments.push(`<div class="cell">`);

		// comments.push(`<!-- #endregion switchcase-value-cell -->`);
		// comments.push(`<!-- #region switchcase-direction-cell -->`);
		// comments.push(`<div class="cell">1</div>`);
		// comments.push(`<!-- #endregion switchcase-direction-cell -->`);
		// comments.push(`</div>`);
		// comments.push(`<!-- #endregion switchcase-value-row -->`);
		// comments.push(`<!-- #region switchcase-body-row -->`);
		// comments.push(`<div class="row">`);
		// comments.push(`<!-- #region switchcase-body-cell -->`);
		// comments.push(`<div class="cell">`);
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });

		return;
	}

	//exitBreakStatement(path);
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

// function doesIncludeBreakStatement(path: NodePath<Node>, topPathTypeList: string[]): bool {
// 	if (!path.parentPath) {
// 		return path.type;
// 	}
// 	else if (topPathTypeList.includes(path.parentPath.type)) {
// 		return path.parentPath.type;
// 	}
// 	else {
// 		return getMatchTopPathType(path.parentPath, topPathTypeList);
// 	}
// }

function hasNoBreakStatement(path: NodePath<Node>) {
	let hasNoBreakStatement = false;

	path.traverse({
		BreakStatement() {
			hasNoBreakStatement = true;
			return;
		}
	});

	return !hasNoBreakStatement;
}

function isLastSwitchCase(path: NodePath<Node>) {
	if (path.key === (path.container as Node[]).length - 1) {
		return true
	}

	return false;
}