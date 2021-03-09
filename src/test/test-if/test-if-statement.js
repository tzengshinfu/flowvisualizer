//if 敘述句(無else)
//if (if_1 === 1) {
//	console.log('if-1-if');
//}

//if 敘述句(有else)
//if (if_2 === 2) {
//	console.log('if-2-if');
//}
//else {
//	console.log('if-2-else');
//}

//if 敘述句(else if)
if (if_3 === 1) {
	console.log('if-3-if');
}
else if (if_3 === 2) {
	console.log('if-3-elseif-1');
}
else if (if_3 === 3) {
	console.log('if-3-elseif-2');
}

//if 敘述句(else if+else)
if (if_4 === 1) {
	console.log('if-4-if');
}
else if (if_4 === 2) {
	console.log('if-4-elseif-1');
}
else if (if_4 === 3) {
	console.log('if-4-elseif-2');
}
else {
	console.log('if-4-else');
}

//if 敘述句(巢狀結構)
if (if_5 === 1) {
	if (if_5 === 2) {
		if (if_5 === 3) {
			console.log('if-5-if-1');
		}
		else {
			console.log('if-5-else');
		}
	}
	else {
		if (if_5 === 4) {
			console.log('if-5-if-2');
		}
	}
}
else {
	if (if_5 === 5) {
		console.log('if-5-if-3');
	}
}
