import * as assert from 'assert';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { VariableDeclaration, Comment } from '@babel/types';
import * as fs from 'fs';
import generate from "@babel/generator";
import * as os from 'os';
import { transform } from "@babel/core";
import * as types from '@babel/types'




describe('extension.ts', () => {
	it('Test getFlowBlockHtml', () => {
		const sourceCode = `	
		//file

		//header1 
		//header2 
		var aaa1 = 3333, bbb1;
		//tail1
		//tail2

		//if-start
		if (aaa1) 
		//if-end
		console.log(aaa1);

		var a;
		if (a===2) {
			console.log(a);
		}

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
		let flowblockHtml = getFlowBlockHtml(sourceCode);
		let htmlFilePath = `${os.homedir()}/Desktop/test-result.html`;

		if (fs.existsSync(htmlFilePath)) {
			fs.unlinkSync(htmlFilePath);
		}

		fs.writeFileSync(htmlFilePath, flowblockHtml, 'utf8');
		assert.equal(fs.existsSync(htmlFilePath), true);
	});
});

function getFlowBlockHtml(sourceCode: string) {
	let flowblockHtml = '';

	const ast = parser.parse(sourceCode);

	const result = transform(sourceCode, { plugins: [get1] });


	function get1({ types: t }: { types: typeof types }) {
		return {

		}
	}

	traverse(ast, {
		enter(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			path.node.leadingComments = null;
			path.node.trailingComments = null;
			let comments = [];

			if (path.isVariableDeclaration()) {
				path.addComment(CommentType.Leading, DivTag.Start, false);
				path.addComment(CommentType.Trailing, DivTag.End, false);
			}

			if (path.isIfStatement()) {
				comments.push(DivTag.Start);

				path.addComment(CommentType.Leading, DivTag.Start, false);
				path.addComment(CommentType.Trailing, DivTag.End, false);

				if (!path.node.alternate) {
					comments.push('span');
					path.addComment(CommentType.Leading, 'span', false);
				}
			}

			if (path.key === 'consequent') {
				//path.addComment('leading', '&lt;/div&gt;', false);
				//path.addComment('leading', '&lt;div&gt;', false);
			}
		},
		exit(path) {
			if (path.isFile() || path.isProgram()) {
				return;
			}

			if (path.isVariableDeclaration()) {

			}

			if (path.isIfStatement()) {

			}

			if (path.key === 'test') {
				//debugger;
			}
		}
	});

	let code = generate(ast, { retainLines: true, retainFunctionParens: true }).code;
	let code1 = code.replace(/ /g, '&nbsp;');
	let code2 = code1.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
	let code3 = code2.replace(/\n/g, '<br />');
	flowblockHtml = code3;

	return flowblockHtml;
}

enum CommentType {
	Leading = 'leading',
	Trailing = 'trailing',
}

enum DivTag {
	Start = '&lt;div&gt;',
	End = '&lt;/div&gt;',
}