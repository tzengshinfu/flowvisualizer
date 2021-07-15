import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import { Node, Identifier } from '@babel/types';
import * as fs from 'fs';
import generate from '@babel/generator';
import { CommentType, Key, PathType, DoubleQuote } from '../variable';
import { JSDOM } from 'jsdom';

describe('getFlowBlockHtml', function () {
	it('test All Statements', function () {
		const sourceCode = fs.readFileSync('./src/test/test-all/test-all-statement.js', 'utf8');
		const flowblockHtml = getFlowBlockHtml_all(sourceCode);
		const htmlFilePath = './src/test/test-all/test-all-result.html';
		const pathLevelChart = getPathLevelChart(sourceCode);
		const chartFilePath = './src/test/test-all/test-all-chart.html';

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

function getFlowBlockHtml_all(sourceCode: string) {
	let flowblockHtml = '';
	const ast = parser.parse(sourceCode);
	const style = fs.readFileSync('./media/flow-visualizer.css', 'utf8');

	traverse(ast, {
		enter(path) {
			const isEnter = true;

			clearPathComments(path, isEnter);
			addPathDataFromParent(path, isEnter);
			processProgram(path, isEnter);
			processIfStatement(path, isEnter);
			processExpressionStatement(path, isEnter);
			processVariableStatement(path, isEnter);
			processForStatement(path, isEnter);
			processForXStatement(path, isEnter);
			processDoWhileStatement(path, isEnter);
			processWhileStatement(path, isEnter);
			processContinueStatement(path, isEnter);
			processBreakStatement(path, isEnter);
			processThrowStatement(path, isEnter);
			processReturnStatement(path, isEnter);
			processSwitchStatement(path, isEnter);
			processTryStatement(path, isEnter);
			processFunctionStatement(path, isEnter);
		},
		exit(path) {
			const isEnter = false;

			clearPathComments(path, isEnter);
			addPathDataFromParent(path, isEnter);
			processProgram(path, isEnter);
			processIfStatement(path, isEnter);
			processExpressionStatement(path, isEnter);
			processVariableStatement(path, isEnter);
			processForStatement(path, isEnter);
			processForXStatement(path, isEnter);
			processDoWhileStatement(path, isEnter);
			processWhileStatement(path, isEnter);
			processContinueStatement(path, isEnter);
			processBreakStatement(path, isEnter);
			processThrowStatement(path, isEnter);
			processReturnStatement(path, isEnter);
			processSwitchStatement(path, isEnter);
			processTryStatement(path, isEnter);
			processFunctionStatement(path, isEnter);
		}
	});

	const code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	const nodes = convertToNodes(code);
	const script = fs.readFileSync('./media/flow-visualizer.js', 'utf8');
	flowblockHtml = `<html><head><style type="text/css">${style}</style></head><body>${nodes}<script>${script}</script></body></html>`;

	return flowblockHtml;
}

function processProgram(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isProgram()) {
			comments.push(`<table name="Program-block" class="padding-all-5px"><tr><td>`);
			comments.push(`<table name="Start-block" class="outer-alignment-center padding-all-5px"><tr><td class="border-all-3px-solid-silver border-rounded-50percent backgroundcolor-yellow-200 padding-all-5px"><img src="../../../media/start.png"></td></tr></table><!--/name="Start-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
	else {
		if (path.isProgram()) {
			comments.push(`<table name="End-block" class="outer-alignment-center padding-all-5px"><tr><td class="border-all-3px-solid-silver border-rounded-50percent backgroundcolor-lime-500 padding-all-5px"><img src="../../../media/end.png"></td></tr></table><!--/name="End-block"-->`);
			comments.push(`</td></tr></table><!--/name="Program-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
}

function processIfStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isIfStatement()) {
			//else if(當被其他if包覆)
			if (path.key === Key.Alternate) {
				comments.push(`<td name="IfStatement-Else-Alternate-unit" class="border-left-3px-solid-silver backgroundcolor-gray-200 inner-alignment-center">`);
				comments.push(`<table name="IfStatement-Else-Alternate-block" class="outer-alignment-center">`);
				comments.push(`<tr name="IfStatement-Else-level">`);
				comments.push(`<td name="IfStatement-Else-unit" class="backgroundcolor-gray-200 padding-all-5px inner-alignment-center">`);
				comments.push(`else`);
				comments.push(`</td><!--/name="IfStatement-Else-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Else-level"-->`);
				comments.push(`<tr name="IfStatement-Alternate-level">`);
				comments.push(`<td name="IfStatement-Alternate-unit" class="border-top-3px-solid-silver backgroundcolor-gray-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
			}

			comments.push(`<table name="IfStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}">`);
			comments.push(`<tr name="IfStatement-Test-Consequent-Alternate-level">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isIfStatement()) {
			if (path.key === Key.Test) {
				comments.push(`<td name="IfStatement-Test-Consequent-unit" class="backgroundcolor-orange-50 inner-alignment-top">`);
				comments.push(`<table name="IfStatement-Test-Consequent-block" class="outer-alignment-center">`);
				comments.push(`<tr name="IfStatement-Test-level">`);
				comments.push(`<td name="IfStatement-Test-unit" class="backgroundcolor-orange-200 padding-all-5px inner-alignment-center">`);
				comments.push('if (');
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Consequent) {
				comments.push(`<tr name="IfStatement-Consequent-level">`);
				comments.push(`<td name="IfStatement-Consequent-unit" class="border-top-3px-solid-silver backgroundcolor-orange-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			//else
			if (path.key === Key.Alternate) {
				comments.push(`<td name="IfStatement-Else-Alternate-unit" class="border-left-3px-solid-silver backgroundcolor-gray-50 inner-alignment-top">`);
				comments.push(`<table name="IfStatement-Else-Alternate-block" class="inner-alignment-top">`);
				comments.push(`<tr name="IfStatement-Else-level">`);
				comments.push(`<td name="IfStatement-Else-unit" class="backgroundcolor-gray-200 padding-all-5px inner-alignment-center">`);
				comments.push(`else`);
				comments.push(`</td><!--/name="IfStatement-Else-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Else-level"-->`);
				comments.push(`<tr name="IfStatement-Alternate-level">`);
				comments.push(`<td name="IfStatement-Alternate-unit" class="border-top-3px-solid-silver backgroundcolor-gray-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isIfStatement()) {
			//沒有else則生成虛擬的not match路徑
			if (!path.node.alternate) {
				comments.push(`<td name="IfStatement-NotMatch-Exit-unit" class="border-left-3px-solid-silver backgroundcolor-gray-50 inner-alignment-top">`);
				comments.push(`<table name="IfStatement-NotMatch-Exit-block" class="outer-alignment-center">`);
				comments.push(`<tr name="IfStatement-NotMatch-level">`);
				comments.push(`<td name="IfStatement-NotMatch-unit" class="backgroundcolor-gray-200 padding-all-5px inner-alignment-top inner-alignment-center">`);
				comments.push(`not match`);
				comments.push(`</td><!--/name="IfStatement-NotMatch-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-NotMatch-level"-->`);
				comments.push(`<tr name="IfStatement-Exit-level">`);
				comments.push(`<td name="IfStatement-Exit-unit" class="border-top-3px-solid-silver padding-all-5px inner-alignment-top inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				comments.push(`</td><!--/name="IfStatement-Exit-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Exit-level"-->`);
				comments.push(`</table><!--/name="IfStatement-NotMatch-Exit-block"-->`);
				comments.push(`</td><!--/name="IfStatement-NotMatch-Exit-unit"-->`);
			}
			else if (path.node.alternate.type === PathType.IfStatement) {
				comments.push(`</td><!--/name="IfStatement-Alternate-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Alternate-level"-->`);
				comments.push(`</table><!--/name="IfStatement-Else-Alternate-block"-->`);
				comments.push(`</td><!--/name="IfStatement-Else-Alternate-unit"-->`);
			}

			comments.push(`</tr><!--/name="IfStatement-Test-Consequent-Alternate-level"-->`);
			comments.push(`</table><!--/name="IfStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isIfStatement()) {
			if (path.key === Key.Test) {
				comments.push(')');
				comments.push(`</td><!--/name="IfStatement-Test-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Test-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Consequent) {
				comments.push(`</td><!--/name="IfStatement-Consequent-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Consequent-level"-->`);
				comments.push(`</table><!--/name="IfStatement-Test-Consequent-block"-->`);
				comments.push(`</td><!--/name="IfStatement-Test-Consequent-unit"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Alternate) {
				comments.push(`</td><!--/name="IfStatement-Alternate-unit"-->`);
				comments.push(`</tr><!--/name="IfStatement-Alternate-level"-->`);
				comments.push(`</table><!--/name="IfStatement-Else-Alternate-block"-->`);
				comments.push(`</td><!--/name="IfStatement-Else-Alternate-unit"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processForStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isForStatement()) {
			comments.push(`<table name="ForStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}" data-start="${path.node.start}" data-end="${path.node.end}">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isForStatement()) {
			if (path.key === Key.Init) {
				comments.push(`<tr name="ForStatement-Test-level">`);
				comments.push(`<td name="ForStatement-Test-unit" class="backgroundcolor-orange-200 padding-all-5px inner-alignment-center">`);
				comments.push('for (');
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`<tr name="ForStatement-Body-level">`);
				comments.push(`<td name="ForStatement-Body-unit" class="border-top-3px-solid-silver border-bottom-3px-solid-silver border-right-3px-solid-silver backgroundcolor-orange-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isForStatement()) {
			comments.push(`<tr>`);
			comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-center padding-all-2px"><img src="../../../media/down-arrow.png"> or <img src="../../../media/downtoright-arrow.png"></td>`);
			comments.push(`<td class="backgroundcolor-orange-200 padding-all-5x"><img src="../../../media/righttoup-arrow.png"></td>`);
			comments.push(`</tr>`);
			comments.push(`</table><!--/name="ForStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img name="${PathType.BreakStatement}" src="../../../media/down-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isForStatement()) {
			if (path.key === Key.Update) {
				comments.push(')');
				comments.push(`</td><!--/name="ForStatement-Test-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-middle padding-all-5px"><img name="${PathType.ContinueStatement}" src="../../../media/uptoleft-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td>`);
				comments.push(`</tr><!--/name="ForStatement-Test-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="ForStatement-Body-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-middle padding-all-5px"><img src="../../../media/cycle-arrow.png"></td>`);
				comments.push(`</tr><!--/name="ForStatement-Body-level"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processForXStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isForXStatement()) {
			comments.push(`<table name="ForXStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}" data-start="${path.node.start}" data-end="${path.node.end}">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isForXStatement()) {
			if (path.key === Key.Left) {
				comments.push(`<tr name="ForXStatement-Test-level">`);
				comments.push(`<td name="ForXStatement-Test-unit" class="backgroundcolor-orange-200 padding-all-5px inner-alignment-center">`);
				comments.push('for (');
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`<tr name="ForXStatement-Body-level">`);
				comments.push(`<td name="ForXStatement-Body-unit" class="border-top-3px-solid-silver border-bottom-3px-solid-silver border-right-3px-solid-silver backgroundcolor-orange-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isForXStatement()) {
			comments.push(`<tr>`);
			comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-center padding-all-2px"><img src="../../../media/down-arrow.png"> or <img src="../../../media/downtoright-arrow.png"></td>`);
			comments.push(`<td class="backgroundcolor-orange-200"><img src="../../../media/righttoup-arrow.png"></td>`);
			comments.push(`</tr>`);
			comments.push(`</table><!--/name="ForXStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img name="${PathType.BreakStatement}" src="../../../media/down-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isForXStatement()) {
			if (path.key === Key.Right) {
				comments.push(')');
				comments.push(`</td><!--/name="ForXStatement-Test-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200"><img name="${PathType.ContinueStatement}" src="../../../media/uptoleft-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td>`);
				comments.push(`</tr><!--/name="ForXStatement-Test-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="ForXStatement-Body-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-middle padding-all-5px"><img src="../../../media/cycle-arrow.png"></td>`);
				comments.push(`</tr><!--/name="ForXStatement-Body-level"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processDoWhileStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isDoWhileStatement()) {
			comments.push(`<table name="DoWhileStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}" data-start="${path.node.start}" data-end="${path.node.end}">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isDoWhileStatement()) {
			if (path.key === Key.Test) {
				comments.push(`<tr name="DoWhileStatement-Test-level">`);
				comments.push(`<td name="DoWhileStatement-Test-unit" class="backgroundcolor-orange-200 inner-alignment-center padding-all-2px">`);
				comments.push('<img src="../../../media/down-arrow.png"> or while (');
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`<tr name="DoWhileStatement-Do-level">`);
				comments.push(`<td name="DoWhileStatement-Do-unit" class="backgroundcolor-orange-200 inner-alignment-center padding-all-5px">`);
				comments.push('do');
				comments.push(`</td><!--/name="DoWhileStatement-Do-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200"><img name="${PathType.ContinueStatement}" src="../../../media/uptoleft-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td>`);
				comments.push(`</tr><!--/name="DoWhileStatement-Do-level"-->`);
				comments.push(`<tr name="DoWhileStatement-Body-level">`);
				comments.push(`<td name="DoWhileStatement-Body-unit" class="border-top-3px-solid-silver border-bottom-3px-solid-silver border-right-3px-solid-silver backgroundcolor-orange-50 inner-alignment-center padding-all-5px">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isDoWhileStatement()) {
			comments.push(`</table><!---name="DoWhileStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img name="${PathType.BreakStatement}" src="../../../media/down-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isDoWhileStatement()) {
			if (path.key === Key.Test) {
				comments.push(`)<img src="../../../media/right-arrow.png">`);
				comments.push(`</td><!--/name="DoWhileStatement-Test-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200"><img src="../../../media/righttoup-arrow.png"></td>`);
				comments.push(`</tr><!--/name="DoWhileStatement-Test-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="DoWhileStatement-Body-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-middle padding-all-5px"><img src="../../../media/cycle-arrow.png"></td>`);
				comments.push(`</tr><!--/name="DoWhileStatement-Body-level"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processWhileStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isWhileStatement()) {
			comments.push(`<table name="WhileStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}" data-start="${path.node.start}" data-end="${path.node.end}">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isWhileStatement()) {
			if (path.key === Key.Test) {
				comments.push(`<tr name="WhileStatement-Test-level">`);
				comments.push(`<td name="WhileStatement-Test-unit" class="backgroundcolor-orange-200 inner-alignment-center padding-all-5px">`);
				comments.push('while (');
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`<tr name="WhileStatement-Body-level">`);
				comments.push(`<td name="WhileStatement-Body-unit" class="border-top-3px-solid-silver border-bottom-3px-solid-silver border-right-3px-solid-silver backgroundcolor-orange-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isWhileStatement()) {
			comments.push(`<tr>`);
			comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-center padding-all-2px"><img src="../../../media/down-arrow.png"> or <img src="../../../media/downtoright-arrow.png"></td>`);
			comments.push(`<td class="backgroundcolor-orange-200"><img src="../../../media/righttoup-arrow.png"></td>`);
			comments.push(`</tr>`);
			comments.push(`</table><!--/name="WhileStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img name="${PathType.BreakStatement}" src="../../../media/down-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isWhileStatement()) {
			if (path.key === Key.Test) {
				comments.push(')');
				comments.push(`</td><!--/name="WhileStatement-Test-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200"><img name="${PathType.ContinueStatement}" src="../../../media/uptoleft-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td>`);
				comments.push(`</tr><!--/name="WhileStatement-Test-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="WhileStatement-Body-unit"-->`);
				comments.push(`<td class="backgroundcolor-orange-200 inner-alignment-middle padding-all-5px"><img src="../../../media/cycle-arrow.png"></td>`);
				comments.push(`</tr><!--/name="WhileStatement-Body-level"-->`);
				processExpressionStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				processVariableStatement(path, isEnter, PathType.SingleLineStatement); //single-line expression
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processExpressionStatement(path: NodePath<Node>, isEnter: boolean, currentStatementType = '') {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isExpressionStatement()) {
			if (currentStatementType === PathType.SingleLineStatement) {
				path.setData('type', PathType.SingleLineStatement);
				path.setData('start', path.node.start as number);
			}
			else if (path.parentPath?.isProgram() || path.parentPath?.isBlockStatement()) {
				path.setData('type', PathType.ExpressionStatement);
				path.setData('start', path.node.start as number);
			}

			if (path.getData('type') === currentStatementType || path.getData('type') === PathType.ExpressionStatement) {
				comments.push(`<table name="ExpressionStatement-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}" title="${getUnreachableCode(path).titleText}"><tr><td>`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isExpressionStatement()) {
			if (path.getData('type') === currentStatementType || path.getData('type') === PathType.ExpressionStatement) {
				comments.push(`</td></tr></table><!--/name="ExpressionStatement-block"-->`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processContinueStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isContinueStatement()) {
			if (!path.parentPath.getData('type')) {
				path.parentPath.setData('type', PathType.ContinueStatement);
				path.parentPath.setData('start', path.node.start as number);
			}

			comments.push(`<table class="text-color-sky-600 text-boldface outer-alignment-center ${getUnreachableCode(path).className} padding-all-5px" title="${getUnreachableCode(path).titleText}"><tr><td>`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
	else {
		if (path.isContinueStatement()) {
			comments.push(`</td></tr></table>`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><a href="#" onclick="moveOrStopFlowIcon(this, '${PathType.ContinueStatement}')"><img src="../../../media/next-arrow.png"></a></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
}

function processBreakStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isBreakStatement()) {
			if (!path.parentPath.getData('type')) {
				path.parentPath.setData('type', PathType.BreakStatement);
				path.parentPath.setData('start', path.node.start as number);
			}

			comments.push(`<table class="text-color-gray-700 text-boldface outer-alignment-center ${getUnreachableCode(path).className} padding-all-5px" title="${getUnreachableCode(path).titleText}"><tr><td>`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
	else {
		if (path.isBreakStatement()) {
			comments.push(`</td></tr></table>`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><a href="#" onclick="moveOrStopFlowIcon(this, '${PathType.BreakStatement}')"><img src="../../../media/end-arrow.png"></a></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
}

function processThrowStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isThrowStatement()) {
			if (!path.parentPath.getData('type')) {
				path.parentPath.setData('type', PathType.ThrowStatement);
				path.parentPath.setData('start', path.node.start as number);
			}

			comments.push(`<table name="ThrowStatement-block" class="outer-alignment-center ${getUnreachableCode(path).className} padding-all-5px" title="${getUnreachableCode(path).titleText}">`);
			comments.push(`<tr name="ThrowStatement-level">`);
			comments.push(`<td name="ThrowStatement-Keyword-unit" class="text-color-red-600 text-boldface">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isThrowStatement()) {
			comments.push(`</td><!--/name="ThrowStatement-Keyword-unit"-->`);
			comments.push(`<td name="ThrowStatement-Body-unit">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
	else {
		if (path.isThrowStatement()) {
			comments.push(`</td><!--/name="ThrowStatement-Body-unit"-->`);
			comments.push(`</tr><!--/name="ThrowStatement-level"-->`);
			comments.push(`</table><!--/name="ThrowStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><a href="#" onclick="toggleCatchStatementBlock(this)"><span class="tooltip"><img src="../../../media/warning.png"><div class="tooltip-text">Show Catch Statement Block</div></span></a></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
}

function processReturnStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isReturnStatement()) {
			if (!path.parentPath.getData('type')) {
				path.parentPath.setData('type', PathType.ReturnStatement);
				path.parentPath.setData('start', path.node.start as number);
			}

			comments.push(`<table name="ReturnStatement-block" class="outer-alignment-center ${getUnreachableCode(path).className} padding-all-5px" title="${getUnreachableCode(path).titleText}">`);
			comments.push(`<tr name="ReturnStatement-level">`);
			comments.push(`<td name="ReturnStatement-Keyword-unit" class="text-color-purple-700 text-boldface">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isReturnStatement()) {
			comments.push(`</td><!--/name="ReturnStatement-Keyword-unit"-->`);
			comments.push(`<td name="ReturnStatement-Body-unit">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
	else {
		if (path.isReturnStatement()) {
			comments.push(`</td><!--/name="ReturnStatement-Body-unit"-->`);
			comments.push(`</tr><!--/name="ReturnStatement-level"-->`);
			comments.push(`</table><!--/name="ReturnStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><a href="#"><img src="../../../media/end-arrow.png"></a></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
}

function processSwitchStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isSwitchStatement()) {
			comments.push(`<table name="SwitchStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}" data-start="${path.node.start}" data-end="${path.node.end}">`);
			comments.push(`<tr name="SwitchStatement-Discriminant-level">`);
			comments.push(`<td name="SwitchStatement-Discriminant-unit" colspan="1000" class="backgroundcolor-orange-200 inner-alignment-top inner-alignment-center padding-all-5px">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.isSwitchCase()) {
			if (path.key === 0) {
				comments.push(`</td><!--/name="SwitchStatement-Discriminant-unit"-->`);
				comments.push(`</tr><!--/name="SwitchStatement-Discriminant-level"-->`);
				comments.push(`<tr name="SwitchStatement-Cases-level">`);
			}

			comments.push(`<td name="SwitchStatement-Case-unit" class="${(path.key !== 0 ? "border-left-3px-solid-silver" : "")} border-top-3px-solid-silver backgroundcolor-orange-50 inner-alignment-top">`);
			comments.push(`<table name="SwitchCase-block" class="outer-alignment-center">`);
			comments.push(`<tr name="SwitchCase-Test-level">`);
			comments.push(`<td name="SwitchCase-Test-unit" class="backgroundcolor-orange-200 padding-all-5px inner-alignment-top inner-alignment-center">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isSwitchCase()) {
			if (path.key === 0) {
				comments.push(`</td><!--/name="SwitchCase-Test-unit"-->`);
				comments.push(`<td name="SwitchCase-Placeholder-unit" class="backgroundcolor-gray-50 border-left-3px-solid-silver padding-all-5px">`);
				comments.push(`</td><!--/name="SwitchCase-Placeholder-unit"-->`);
				comments.push(`</tr><!--/name="SwitchCase-Test-level"-->`);
				comments.push(`<tr name="SwitchCase-Body-level">`);
				comments.push(`<td name="SwitchCase-Body-unit" class="border-top-3px-solid-silver backgroundcolor-orange-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isSwitchStatement()) {
			const defaultCase = path.node.cases.find((switchCase) => { return switchCase.test === null; });

			if (!defaultCase) {
				comments.push(`<td name="SwitchStatement-Case-unit" class="border-left-3px-solid-silver border-top-3px-solid-silver backgroundcolor-gray-50 inner-alignment-top">`);
				comments.push(`<table name="SwitchCase-block" class="outer-alignment-center">`);
				comments.push(`<tr name="SwitchCase-Test-level">`);
				comments.push(`<td name="SwitchCase-Test-unit" class="backgroundcolor-gray-200 padding-all-5px inner-alignment-top inner-alignment-center">`);
				comments.push(`not match`);
				comments.push(`</td><!--/name="SwitchCase-Test-unit"-->`);
				comments.push(`</tr><!--/name="SwitchCase-Test-level"-->`);
				comments.push(`<tr name="SwitchCase-Body-level">`);
				comments.push(`<td name="SwitchCase-Body-unit" class="border-top-3px-solid-silver padding-all-5px">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				comments.push(`</td><!--/name="SwitchCase-Body-unit"-->`);
				comments.push(`</tr><!--/name="SwitchCase-Body-level"-->`);
				comments.push(`</table><!--/name="SwitchCase-block"-->`);
				comments.push(`</td><!--/name="SwitchStatement-Case-unit"-->`);
			}

			comments.push(`</tr><!--/name="SwitchStatement-Cases-level"-->`);
			comments.push(`</table><!--/name="SwitchStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img name="${PathType.BreakStatement}" src="../../../media/down-arrow.png" data-start="${path.node.start}" data-end="${path.node.end}"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.isSwitchCase()) {
			const hasBreak = path.getData('type') === PathType.BreakStatement ? true : false;
			const isLast = path.key === (path.container as Node[]).length - 1 ? true : false;

			comments.push(`</td><!--/name="SwitchCase-Body-unit"-->`);

			if (hasBreak && !isLast) {
				comments.push(`<td name="SwitchCase-Fallthrough-unit" class="backgroundcolor-gray-50 border-left-3px-solid-silver padding-all-5px"><img src="../../../media/uptoright-arrow.png"></td><!--/name="SwitchCase-Fallthrough-unit"-->`);
			}

			comments.push(`</tr><!--/name="SwitchCase-Body-level"-->`);

			if (hasBreak && !isLast) {
				comments.push(`<tr>`);
				comments.push(`<td name="SwitchCase-Flow-unit" class="backgroundcolor-gray-50 border-top-3px-solid-silver inner-alignment-center padding-all-5px"><img src="../../../media/downtoright-arrow.png"></td><!--/name="SwitchCase-Flow-unit"-->`);
				comments.push(`<td class="backgroundcolor-gray-50 padding-all-5px"><img src="../../../media/righttoup-arrow.png"></td>`);
				comments.push(`</tr>`);
			}

			comments.push(`</table><!--/name="SwitchCase-block"-->`);
			comments.push(`</td><!--/name="SwitchStatement-Case-unit"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}
	}
}

function processTryStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		//try
		if (path.isTryStatement()) {
			comments.push(`<table name="TryStatement-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center ${getUnreachableCode(path).className} margin-topbottom-5px" title="${getUnreachableCode(path).titleText}">`);
			comments.push(`<tr name="TryStatement-Try-level">`);
			comments.push(`<td name="TryStatement-Try-unit" class="backgroundcolor-green-200 inner-alignment-top inner-alignment-center padding-all-5px">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isTryStatement()) {
			//try-body
			if (path.key === Key.Block) {
				comments.push(`</td><!--/name="TryStatement-Try-unit"-->`);
				comments.push(`</tr><!--/name="TryStatement-Try-level"-->`);
				comments.push(`<tr name="TryStatement-Try-Body-level">`);
				comments.push(`<td name="TryStatement-Try-Body-unit" class="border-top-3px-solid-silver border-bottom-3px-solid-silver backgroundcolor-green-50 hidden-warning-sign-wrapper inner-alignment-top inner-alignment-center padding-all-5px">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			//catch
			if (path.key === Key.Handler) {
				comments.push(`<tr name="TryStatement-Catch-level">`);
				comments.push(`<td name="TryStatement-Catch-unit" class="hide backgroundcolor-red-200 inner-alignment-top inner-alignment-center padding-all-5px">`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			//finally
			if (path.key === Key.Finalizer) {
				comments.push(`<tr name="TryStatement-Finally-level">`);
				comments.push(`<td name="TryStatement-Finally-unit" class="backgroundcolor-blue-200 inner-alignment-top inner-alignment-center padding-all-5px">`);
				comments.push(`finally`);
				comments.push(`</td><!--/name="TryStatement-Finally-unit"-->`);
				comments.push(`</tr><!--/name="TryStatement-Finally-level"-->`);
				comments.push(`<tr name="TryStatement-Finally-Body-level">`);
				comments.push(`<td name="TryStatement-Finally-Body-unit" class="border-top-3px-solid-silver backgroundcolor-blue-50 inner-alignment-top inner-alignment-center padding-all-5px">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}

		//catch-body
		if (path.parentPath?.isCatchClause()) {
			if (path.key === Key.Body) {
				comments.push(`<tr name="TryStatement-Catch-Body-level">`);
				comments.push(`<td name="TryStatement-Catch-Body-unit" class="hide border-top-3px-solid-silver border-bottom-3px-solid-silver backgroundcolor-red-50 inner-alignment-top inner-alignment-center padding-all-5px">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		//try
		if (path.isTryStatement()) {
			comments.push(`</table><!--/name="TryStatement-block"-->`);
			comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isTryStatement()) {
			//try-body
			if (path.key === Key.Block) {
				comments.push(`<a href="#" class="hidden-warning-sign" onclick="toggleCatchStatementBlock(this)"><span class="tooltip"><img src="../../../media/warning.png"><div class="tooltip-text">Show Catch Statement Block</div></span></a>`);
				comments.push(`</td><!--/name="TryStatement-Try-Body-unit"-->`);
				comments.push(`</tr><!--/name="TryStatement-Try-Body-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			//catch
			if (path.key === Key.Handler) {
				comments.push(`</td><!--/name="TryStatement-Catch-unit"-->`);
				comments.push(`</tr><!--/name="TryStatement-Catch-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			//finally
			if (path.key === Key.Finalizer) {
				comments.push(`</td><!--/name="TryStatement-Finally-Body-unit"-->`);
				comments.push(`</tr><!--/name="TryStatement-Finally-Body-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}

		//catch-body
		if (path.parentPath?.isCatchClause()) {
			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="TryStatement-Catch-Body-unit"-->`);
				comments.push(`</tr><!--/name="TryStatement-Catch-Body-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function processFunctionStatement(path: NodePath<Node>, isEnter: boolean) {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isFunctionDeclaration()) {
			comments.push(`<div id="${path.node.id?.name}" data-declare-function-parameter-json="${JSON.stringify((path.node.params as Node[]).map((parameter) => { return generate(parameter).code; })).replace(/\\/g, '\\\\').replace(/"/g, '\\' + DoubleQuote)}" class="lightbox">`);
			comments.push(`<a href="#" class="close"></a>`);
			comments.push(`<table name="FunctionDeclaration-block" class="border-all-3px-solid-silver border-rounded-3px outer-alignment-center">`);
			comments.push(`<tr name="FunctionDeclaration-Id-level">`);
			comments.push(`<td name="FunctionDeclaration-Id-unit" class="backgroundcolor-yellow-200 inner-alignment-top padding-all-5px inner-alignment-center">`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isFunctionDeclaration()) {
			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="FunctionDeclaration-Id-unit"-->`);
				comments.push(`</tr><!--/name="FunctionDeclaration-Id-level"-->`);
				comments.push(`<tr name="FunctionDeclaration-Body-level">`);
				comments.push(`<td name="FunctionDeclaration-Body-unit" class="border-top-3px-solid-silver backgroundcolor-yellow-50 padding-all-5px inner-alignment-center">`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.isIdentifier()) {
				//參數內容顯示(預設空值，由changeFunctionStatementBlockParameterTooltips方法改變)
				if (path.key !== Key.Id) {
					comments.push(`<span name="${path.node.name}" class="tooltip" data-start="${path.node.start}" data-end="${path.node.end}">${path.node.name}<div class="tooltip-text">`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}
			}
		}
	}
	else {
		if (path.isFunctionDeclaration()) {
			comments.push(`</table><!--/name="FunctionDeclaration-block"-->`);
			comments.push(`</div><!--/name="${path.node.id?.name}"-->`);
			return addHtmlTagsToPathComments(path, isEnter, comments);
		}

		if (path.parentPath?.isFunctionDeclaration()) {
			if (path.key === Key.Body) {
				comments.push(`</td><!--/name="FunctionDeclaration-Body-unit"-->`);
				comments.push(`</tr><!--/name="FunctionDeclaration-Body-level"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}

			if (path.isIdentifier()) {
				if (path.key !== Key.Id) {
					comments.push(`</div></span>`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}
			}
		}
	}
}

function processVariableStatement(path: NodePath<Node>, isEnter: boolean, currentStatementType = '') {
	const comments: string[] = [];

	if (isEnter) {
		if (path.isVariableDeclaration()) {
			if (currentStatementType === PathType.SingleLineStatement) {
				path.setData('type', PathType.SingleLineStatement);
				path.setData('start', path.node.start as number);
			}
			else if (path.parentPath?.isProgram() || path.parentPath?.isBlockStatement()) {
				path.setData('type', PathType.VariableStatement);
				path.setData('start', path.node.start as number);
			}

			if (path.getData('type') === currentStatementType || path.getData('type') === PathType.VariableStatement) {
				comments.push(`<table name="VariableDeclaration-block" class="outer-alignment-center ${getUnreachableCode(path).className} padding-all-5px" title="${getUnreachableCode(path).titleText}">`);
				comments.push(`<tr name="VariableDeclaration-level">`);
				comments.push(`<td name="VariableDeclaration-Id-unit">`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}

		if (path.parentPath?.isVariableDeclarator()) {
			if (path.getData('type') === currentStatementType || path.getData('type') === PathType.VariableStatement) {
				if (path.key === Key.Init) {
					comments.push(`</td><!--/name="VariableDeclaration-Id-unit"-->`);
					comments.push(`<td name="VariableDeclaration-Body-unit" data-variable-name="${(path.parentPath.node?.id as Identifier).name}" data-start="${path.node.start}" data-end="${path.node.end}">`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}
			}
		}

		if (path.parentPath?.isCallExpression()) {
			if (path.isIdentifier()) {
				if (path.key !== Key.Callee) {
					comments.push(`<span name="${path.node.name}" class="tooltip" onmouseover="changeVariableDeclaratorTooltip(this);" data-start="${path.node.start}" data-end="${path.node.end}">${path.node.name}<div class="tooltip-text">`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}

				//加上顯示function內容超連結
				if (path.key === Key.Callee) {
					const callFunctionParameters = (path.parentPath.node.arguments as Node[]).map((parameter) => { return generate(parameter).code; });

					comments.push(`<a href="#${path.node.name}" onclick="changeFunctionStatementBlockParameterTooltips(${DoubleQuote}${path.node.name}${DoubleQuote}, ${DoubleQuote + JSON.stringify(callFunctionParameters).replace(/\\/g, '\\\\').replace(/"/g, '\\' + DoubleQuote) + DoubleQuote})">`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}
			}
		}

		if (path.parentPath?.isBinaryExpression()) {
			if (path.isIdentifier()) {
				comments.push(`<span name="${path.node.name}" class="tooltip" data-start="${path.node.start}" data-end="${path.node.end}">${path.node.name}<div class="tooltip-text">`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
	else {
		if (path.isVariableDeclaration()) {
			if (path.getData('type') === currentStatementType || path.getData('type') === PathType.VariableStatement) {
				comments.push(`</tr><!--/name="VariableDeclaration-level"-->`);
				comments.push(`</table><!--/name="VariableDeclaration-block"-->`);
				comments.push(`<table name="Next-block" class="outer-alignment-center padding-all-5px ${getUnreachableCode(path).className}"><tr><td><img src="../../../media/down-arrow.png"></td></tr></table><!--/name="Next-block"-->`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}

		if (path.parentPath?.isVariableDeclarator()) {
			if (path.getData('type') === currentStatementType || path.getData('type') === PathType.VariableStatement) {
				if (path.key === Key.Init) {
					comments.push(`;`);
					comments.push(`</td><!--/name="VariableDeclaration-Body-unit"-->`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}
			}
		}

		if (path.parentPath?.isCallExpression()) {
			if (path.isIdentifier()) {
				if (path.key !== Key.Callee) {
					comments.push(`</div></span>`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}

				if (path.key === Key.Callee) {
					comments.push(`</a>`);
					return addHtmlTagsToPathComments(path, isEnter, comments);
				}
			}
		}

		if (path.parentPath?.isBinaryExpression()) {
			if (path.isIdentifier()) {
				comments.push(`</div></span>`);
				return addHtmlTagsToPathComments(path, isEnter, comments);
			}
		}
	}
}

function convertToNodes(code: string): string {
	code = code.replace(/(\*\/)\s*if\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //取代 '*/ if ( /*' 為 '*/ /*'
	code = code.replace(/(\*\/)\s*else\s*(\/\*)/g, '$1' + ' ' + '$2'); //取代 '*/ else /*' 為 '*/ /*'
	code = code.replace(/(\*\/)\s*for\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //取代 '*/ for ( /*' 為 '*/ /*'
	code = code.replace(/(\*\/)\s*do\s*(\/\*)/g, '$1' + ' ' + '$2'); //取代 '*/ do /*' 為 '*/ /*'
	code = code.replace(/(\*\/)\s*while\s*\(\s*(\/\*)/g, '$1' + ' ' + '$2'); //取代 '*/ while ( /*' 為 '*/ /*'
	code = code.replace(/(\*\/)\s*finally\s*(\/\*)/g, '$1' + ' ' + '$2'); //取代 '*/ finally /*' 為 '*/ /*'
	code = code.replace(/{/g, ''); //移除 '{'
	code = code.replace(/}/g, ''); //移除 '}'
	code = code.replace(/\/\*/g, ''); //移除 '/*'
	code = code.replace(/\*\//g, ''); //移除 '*/'
	code = code.replace(/(-->);/g, '$1' + ' '); //取代 '-->;' 為 '--> '
	code = code.replace(/(-->)\);/g, '$1' + ' '); //取代 '-->);' 為 '--> '
	code = code.replace(/(-->)\)/g, '$1' + ' '); //取代 '-->)' 為 '--> '
	code = removeUnnecessaryParentheses(code, 'ReturnStatement-Keyword-unit', 'ReturnStatement-Body-unit');
	code = removeUnnecessaryParentheses(code, 'ThrowStatement-Keyword-unit', 'ThrowStatement-Body-unit');
	code = removeUnnecessaryColon(code, 'SwitchCase-Test-unit');
	code = removeUnnecessaryPlaceholderUnit(code, 'SwitchCase-Placeholder-unit', 'SwitchCase-Fallthrough-unit', 'SwitchCase-block');
	code = convertLastSpaceToNBSP(code, 'VariableDeclaration-Id-unit');

	return code;
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

			const level = getPathLevel(path);

			pathLevel += `\n<div>${level}${path.type},parent→${path.parentPath.type},key→${path.key}`;

			if ('name' in path.node) {
				pathLevel += `,text→${path.node.name} `;
			}

			if ('operator' in path.node) {
				pathLevel += `,text→${path.node.operator} `;
			}

			if ('value' in path.node) {
				pathLevel += `,text→${path.node.value?.toString()} `;
			}
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			pathLevel += '</div>\n';
		}
	});

	return `<html><body>${pathLevel}</body></>`;
}

function clearPathComments(path: NodePath<Node>, isEnter: boolean) {
	if (isEnter) {
		path.node.leadingComments = null;
	}
	else {
		path.node.trailingComments = null;
	}
}

function addHtmlTagsToPathComments(path: NodePath<Node>, isEnter: boolean, comments: string[]) {
	if (isEnter) {
		comments.reverse().forEach((comment) => { path.addComment(CommentType.Leading, comment, false); });
	}
	else {
		comments.forEach((comment) => { path.addComment(CommentType.Trailing, comment, false); });
	}
}

/**
 * 取得無法被執行到程式碼[說明文字]及[CSS class名稱]
 * @param path NodePath
 * @returns [說明文字]及[CSS class名稱]物件
 */
function getUnreachableCode(path: NodePath<Node>) {
	const titleTextAndClassName = path.parentPath.getData('type') ? (function () {
		const titleClass = { 'titleText': '', 'className': '' };

		if ((path.node.start as number) > parseInt(path.parentPath.getData('start'))) {
			titleClass['titleText'] = 'unreachable code';
			titleClass['className'] = 'text-strikethrough translucent';
		}

		return titleClass;
	})() : { 'titleText': '', 'className': '' };

	return titleTextAndClassName;
}

function addPathDataFromParent(path: NodePath<Node>, isEnter: boolean) {
	if (isEnter) {
		for (const propertyName in path.parentPath?.data) {
			if (!path.getData(propertyName)) {
				path.setData(propertyName, path.parentPath?.getData(propertyName));
			}
		}
	}
}

/**
 * 移除回傳結果及拋出錯誤前後多餘的括號，如return (result + 1);及throw ('error');
 * @param code - 處理前的HTML內容
 * @param keywordNodeName - 關鍵字節點名稱
 * @param bodyNodeName - 結果／錯誤節點名稱
 * @returns 處理後的HTML內容
 */
function removeUnnecessaryParentheses(code: string, keywordNodeName: string, bodyNodeName: string): string {
	const document = new JSDOM(code).window.document;
	const keywordNodes = document.querySelectorAll(`td[name="${keywordNodeName}"]`);

	keywordNodes.forEach((keywordNode) => {
		keywordNode.innerHTML = keywordNode.innerHTML.lastIndexOf('(') !== -1 ? keywordNode.innerHTML.substring(0, keywordNode.innerHTML.lastIndexOf('(')) + '&nbsp;' : keywordNode.innerHTML;
	});

	const bodyNodes = document.querySelectorAll(`td[name="${bodyNodeName}"]`);

	bodyNodes.forEach((bodyNode) => {
		bodyNode.innerHTML = bodyNode.innerHTML.lastIndexOf(')') !== -1 ? bodyNode.innerHTML.substring(0, bodyNode.innerHTML.lastIndexOf(')')) + ';' : bodyNode.innerHTML;
	});

	return document.documentElement.innerHTML;
}

/**
 * 移除switch敘述case條件後多餘的冒號，如case 'TestValue':
 * @param code - 處理前的HTML內容
 * @param {string} switchCaseTestNodeName - case條件test節點名稱
 * @returns 處理後的HTML內容
 */
function removeUnnecessaryColon(code: string, switchCaseTestNodeName: string): string {
	const document = new JSDOM(code).window.document;
	const caseTestNodes = document.querySelectorAll(`td[name="${switchCaseTestNodeName}"]`);

	caseTestNodes.forEach((caseTestNode) => {
		caseTestNode.innerHTML = caseTestNode.innerHTML.lastIndexOf(':') !== -1 ? caseTestNode.innerHTML.substring(0, caseTestNode.innerHTML.lastIndexOf(':')) : caseTestNode.innerHTML;
	});

	return document.documentElement.innerHTML;
}

/**
 * 移除switch敘述case條件旁多餘的TableCell
 * @param code - 處理前的HTML內容
 * @param {string} placeHolderNodeName - PlaceHolder節點名稱
 * @param {string} fallthroughNodeName - Fallthrough節點名稱
 * @param {string} switchCaseNodeName - case條件節點名稱
 * @returns 處理後的HTML內容
 */
function removeUnnecessaryPlaceholderUnit(code: string, placeHolderNodeName: string, fallthroughNodeName: string, switchCaseNodeName: string): string {
	const document = new JSDOM(code).window.document;
	const caseNodes = document.querySelectorAll<HTMLTableElement>(`table[name="${switchCaseNodeName}"]`);

	caseNodes.forEach((caseNode) => {
		const placeHolderNode = caseNode.querySelector<HTMLTableCellElement>(`td[name="${placeHolderNodeName}"]`);
		const fallthroughNode = caseNode.querySelector<HTMLTableCellElement>(`td[name="${fallthroughNodeName}"]`);

		if (!fallthroughNode && placeHolderNode) {
			placeHolderNode.remove();
		}
	});

	return document.documentElement.innerHTML;
}

function convertLastSpaceToNBSP(code: string, specificNodeName: string): string {
	const document = new JSDOM(code).window.document;
	const specificNodes = document.querySelectorAll(`td[name="${specificNodeName}"]`);

	specificNodes.forEach((specificNode) => {
		specificNode.innerHTML = specificNode.innerHTML.lastIndexOf(' ') !== -1 ? specificNode.innerHTML.substring(0, specificNode.innerHTML.lastIndexOf(' ')) + '&nbsp;' : specificNode.innerHTML;
	});

	return document.documentElement.innerHTML;
}
