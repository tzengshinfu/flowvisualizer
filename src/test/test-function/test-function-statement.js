console.log(test);
var test = test2;
console.log(test('test'));
var test = test('test');
var [result1, result2] = t3(t3(t2("'(1,)'", '"(,2)"'), ',3', '4,'), ',5', '6,');

/*
testFunctionDeclare(3, 4);

var testFunctionExpression = function (param1, param2) { return param1 + param2; };
var result2 = testFunctionExpression(2, 3);

var iifeResult1 = function (param1, param2) { return param1 + param2; }(3, 4);

var iifeResult2 = (function (param1, param2) { return param1 + param2; })(4, 5);

var iifeFunction1 = (function (param1, param2) { return param1 + param2; });
var iifResult3 = iifeFunction1(4, 5);

var iifeResult3 = ((param1, param2) => { return param1 + param2; })(5, 6);



*/
function t3(param1, param2, param3) {
	return testFunction2(param1, param2, param3) + 1;
	console.log('unreachable');
}


function t2(param1, param2) {
	if (1) {
		return param1 + param2;
		console.log('unreachable');
	}

	console.log('reachable');
}

function testFunction2(param1, param2, param3) {
	return param1 + param2 + param3;
}


