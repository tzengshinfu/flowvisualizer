//if敘述句
//無大括號
if (test === 'true')
	console.log('consequent');
else
	console.log('alternate');

//無else
if (test === 'true') {
	console.log('consequent');
}

//有else
if (test === 'true') {
	console.log('consequent');
}
else {
	console.log('alternate');
}

//else if
if (test === 'true') {
	console.log('consequent');
}
else if (test === 'true') {
	console.log('consequent');
}
else if (test === 'true') {
	console.log('consequent');
}

//else if+else
if (test === 'true') {
	console.log('consequent');
}
else if (test === 'true') {
	console.log('consequent');
}
else if (test === 'true') {
	console.log('consequent');
}
else {
	console.log('alternate');
}

//巢狀結構
if (test === 'true') {
	if (test === 'true') {
		console.log('consequent');

		if (test === 'true') {
			console.log('consequent');
		}
		else if (test === 'true') {
			console.log('consequent');
		}
		else if (test === 'true') {
			console.log('consequent');
		}
	}
	else {
		console.log('alternate');

		if (test === 'true') {
			console.log('consequent');
		}
		else if (test === 'true') {
			console.log('consequent');
		}
		else if (test === 'true') {
			console.log('consequent');
		}
		else {
			console.log('alternate');
		}
	}
}
