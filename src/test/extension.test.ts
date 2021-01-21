import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { VariableDeclaration } from '@babel/types';
import * as fs from 'fs';

describe('extension.ts', () => {
	it('test createFlowBlockHtml', () => {
		var f = getFlowBlockHtml('');
		var filePath = 'D:\\Desktop\\test.html';
		fs.writeFileSync(filePath, f, 'utf8');
		assert.equal(3, 3);
	});
});

function getFlowBlockHtml(code: string) {
	var result = '';
	var flowCode = '';
	const sourceCode = `	
	var aaa1 = 3333, bbb1;
	if (aaa1) 
	console.log(aaa1);

	var a;
	if (a===2) 
	console.log(a);

	var a;
	if (a===2) 
	console.log(a);
	else
	console.log(a+1);

	var num3 = (function () {
		if (ppp === 1) {
			return 14;
		}
		else {
			return 15;
		}
	})();

	//變數ppp-start
	/*
	test
	test2
	*/
	var ppp = 1, aaa=2, bbb;
	//變數ppp-end


	if (ppp === 1) {
		console.log(ppp);
	}

	if (ppp === 1) {
		console.log(ppp);
	}
	else {
		console.log(ppp);
	}

	if (ppp === 1) {
		console.log(ppp);
	}
	else if (ppp === 2) {
		//comment1
	}
	else if (ppp === 3) {
		/*
		test
		test2
		*/
	}	

	if (ppp === 1) {
		console.log(ppp);
	}
	else if (ppp === 2) {
		//comment1
	}
	else if (ppp === 3) {
		/*
		test
		test2
		*/
	}
	else {
		console.log('else');
	}

	//test
	/**comment1
	 * comment2
	 * comment3
	 */

	//開始
	console.log('start');
	//開始4

	let var1 = 2;	
	
	class Triangle {
		/** innerComment1 */
	}

	function Test() {
		//innerComment2
	}

	class Rectangle {			
		constructor(height, width) {
			this.height = height;
			this.width = width;
		}
		
		// Getter
		get area() {
			return this.calcArea();
		}
		// Method
		calcArea() {
			return this.height * this.width;
		}
	}
	
	function plus(n) {
		var p = new Object();
		
		loop1:
		for (var pp of p) {		
			console.log(pp);

			loop2:
			for (var ppp in pp) {
				if (ppp === 1) {
					break loop1;
				}
				else if (ppp === 2) {
					//comment1
				}
				else if (ppp === 3) {
					/*
					test
					test2
					*/
				}
				else {
					continue loop2;
				}

				console.log(ppp);
			}
		}

		return n + 1;
	}
	
	/**
	非同步計算
	非同步計算2
	*/
	async function calculateAsync() {
		//#region 
		var var1 = 1;
		var var2 = await plusAsync(var1);
		var var3 = plus(var2);
		var var4 = await plusAsync(var3);
		//#endregion
		
		var var5Task = plusAsync(var4);
		var var6 = 6;
		var var7Task = plusAsync(var6);
	
		var [var5, var7] = await Promise.all([var5Task, var7Task]);
		
		console.log(var5 + var7);
	}
	
	function minus(n) {
		var a;		

		with (Math) {
		  a = PI * r * r;
		}

		console.log(a);

		return n - 1;
	}
	
	try {
		if (var1 === 1) {
			var var2 = var1 + 1;
	
			switch (var2) {
				case 1:
				case 3:
					console.log(var2);
					var2 = 2;
					break;
			
				case 4:
				case 2:
					var2 = 1;
					console.log(var2);
					break;
			
				default:
					throw var2;
			}
		}
		else if (var1 === 2) {
			var var3 = 5;
			var result = 0;
	
			for (var runTimes = 1; runTimes <= var3; runTimes++) {
				result += plus(runTimes);
			}
	
			while (var3 >= 10) {
				result += minus(var3);
				continue;
			}
	
			do {
				result += minus(var3);
				break;
			}
			while (var3 <= 10);
		}
		else if (var1 === 3) {
			var ary1 = [1, 2, 3];
	
			ary1.forEach(function(item, index, array){
				if (item === 1) {
					item = item + 3;
				}
				else if (item === 2) {
					item = item + 2;
				}
				else {
					item = item + 1;
				}					
			});

			var ary2 = ary1.filter((item)=>{return item > 1;});
		}
		else if (var1 === 4) {
			const square = new Rectangle(10, 10);

			console.log(square.area); // 100
		}
		else if (var1 === 5) {
			var num = function message(x) {
				return x + x;
			}
			
			console.log(num(7)); // returns 14

			var num2 = function (x) {
				return x + x;
			}
			
			console.log(num2(7)); // returns 14

			(function () {
				console.log('Immediately Invoked Function Expression.');
			})();

			var num3 = (function () {
				return 14;
			})();

			console.log(num3); //14
		}
		else {
			let task1 = new Promise((resolve, reject) => {
			});
	
			task1.then((data)=> {
				console.log(data);
			}).then((data)=> {
				console.log(data);
			}).catch((err)=> {
				console.log(err);
			}).finally(()=> {
				console.log('done!');
			});				
		}
	
		debugger;
		console.log(var1);
	}
	catch (ex) {
		console.log('catch');
	}
	finally {
		console.log('finally');
	}
	
	(async function() {
		await calculateAsync();
		
		//結束
		//結束2
		console.log('completed');
	}());
	
	function plusAsync(n) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(plus(n));
			}, 0);
		});
	};`;
	const ast = parser.parse(sourceCode);
	let caseOrder = 0;

	traverse(ast, {
		enter(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			flowCode += '\n' + '<div>' + path.type;
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			flowCode += '</div>' + '\n';
		}
	});
	/*
	traverse(ast, {
		enter(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			if (path.isVariableDeclaration()) {
				result += '<div>';

				if (path.node.leadingComments) {
					path.node.leadingComments.forEach((comment) => { result += '<div>' + comment.value + '</div>'; });
				}

				result += '<div>' + path.node.kind + ' ';

				return;
			}

			if (path.isVariableDeclarator()) {
				if (path.key > 0) {
					result += ", ";
				}

				return;
			}

			if (path.isNumericLiteral()) {
				result += (path.key === 'init' ? ' = ' : '') + path.node.extra!['rawValue'];
			}

			if (path.isIfStatement()) {
				result += '<div>';

				if (path.node.leadingComments) {
					path.node.leadingComments.forEach((comment) => { result += '<div>' + comment.value + '</div>'; });
				}

				result += '<div>';
			}

			if (path.key === 'test') {
				result += '<span style="order:99">';
				result += '<div>';
				result += 'if (';
			}

			if (path.isIdentifier()) {
				result += path.node.name;
			}

			if (path.key === 'consequent') {
				debugger;
			}





			if (path.isIdentifier() && path.key === 'left' && path.parentPath.isBinaryExpression() && path.parentPath.key === 'test') {
				result += path.node.name;
			}


			//

			//
			//if (path.isIdentifier() && path.parentPath.isVariableDeclarator()) {
			//	result += ' ' + path.node.name;
			//}
			//
			//if (path.isNumericLiteral() && path.parentPath.isVariableDeclarator()) {
			//	result += ' ' + '=' + ' ' + path.node.value.toString();
			//}


			//if (isVariableDeclarator(getParent(node))) {
			//	if (isIdentifier(node)) {
			//		result += node.name + ' ' + '=' + ' ';
			//	}
			//
			//	if (isNumericLiteral(node)) {
			//		result += node.extra!['raw'] + ';';
			//	}
			//	return;
			//}

			var blockHead = '\n' + '<div>' + path.type;
			flowCode += blockHead;

			// if (['ForOfStatement'
			// 	, 'WhileStatement'
			// 	, 'TryStatement'
			// 	, 'ThrowStatement'
			// 	, 'SwitchStatement'
			// 	, 'ReturnStatement'
			// 	, 'LabeledStatement'
			// 	, 'IfStatement'
			// 	, 'ForInStatement'
			// 	, 'ForStatement'
			// 	, 'DoWhileStatement'
			// 	, 'ContinueStatement'
			// 	, 'BreakStatement'].includes(node.type.toString())) {
			// 	var code = generate(node).code;
			// 	console.log(code);
			// }

			if (['ExportAllDeclaration', 'ExportDefaultDeclaration', 'ExportNamedDeclaration', 'ImportDeclaration'].includes(path.type.toString())) {

			}
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			if (path.isVariableDeclaration()) {
				result += ';';
				result += '</div>';

				if (path.node.trailingComments) {
					path.node.trailingComments.forEach((comment) => { result += '<div>' + comment.value + '</div>'; });
				}

				result += '</div>';

				return;
			}

			if (path.isIfStatement()) {
				if (!path.node.alternate) {
					result += '<span style="order: 1"><div>無條件</div><div>無行為</div></span>';
				}

				result += '</div>';

				if (path.node.trailingComments) {
					path.node.trailingComments.forEach((comment) => { result += '<div>' + comment.value + '</div>'; });
				}

				result += '</div>';
			}

			if (path.key === 'test') {
				result += ')';
				result += '</div>';
			}

			if (path.isIdentifier() && path.key === 'test') {
				result += '</div>';
			}

			if (path.isBinaryExpression() && path.key === 'test') {
				result += '</div>';
			}



			//if (['VariableDeclaration'].includes(node.type)) {
			//	if (node.trailingComments) {
			//		node.trailingComments.forEach((comment) => { result += '<div>' + comment.value + '</div>'; });
			//	}
			//
			//	result += '</div>';
			//}
			//
			//if (['VariableDeclarator'].includes(node.type)) {
			//	result += '</div>';
			//}

			var blockTail = '</div>' + '\n';
			flowCode += blockTail;

			// if (['ForOfStatement'
			// 	, 'WhileStatement'
			// 	, 'TryStatement'
			// 	, 'ThrowStatement'
			// 	, 'SwitchStatement'
			// 	, 'ReturnStatement'
			// 	, 'LabeledStatement'
			// 	, 'IfStatement'
			// 	, 'ForInStatement'
			// 	, 'ForStatement'
			// 	, 'DoWhileStatement'
			// 	, 'ContinueStatement'
			// 	, 'BreakStatement'].includes(node.type.toString())) {
			// 	var code = generate(node).code;
			// 	console.log(code);
			// }
		}
	});
	*/
	//const result = generate(ast);
	//result = result.replace(/\s/g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\n/g, '<br />');
	return flowCode;
}

// function addParent(node: Node, parentNode: Node | undefined) {
// 	if (node.extra === undefined) {
// 		node.extra = {};
// 	}

// 	Object.assign(node.extra, { parent: parentNode });
// }

// function getParent(node: Node): Node | undefined {
// 	if (node.extra !== undefined) {
// 		return (node.extra!['parent'] as Node);
// 	}

// 	return undefined;
// }
