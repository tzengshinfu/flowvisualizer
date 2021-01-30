//for 敘述句
for (let i = 0; i < options.length; i++) {
	console.log(i);
}

//for+in 敘述句
for (let i in arr) {
	console.log(i);
}

//for+of 敘述句
for (let i of arr) {
	console.log(i);
}

//do 敘述句
do {
	console.log(i);
} while (i < 5);

//while 敘述句
while (n < 3) {
	console.log(i);
}

//for+break 敘述句
for (let i = 0; i < a.length; i++) {
	break;
}

//while+continue 敘述句
while (i < 5) {
	i++;
	if (i === 3) {
		continue;
	}
	n += i;
	console.log(n);
}

labelCancelLoops: while (true) {
	console.log('Outer loops: ' + x);
	while (true) {
		console.log('Inner loops: ' + z);
		break labelCancelLoops;
	}
}

checkiandj:
while (i < 4) {
	console.log(i);
	i += 1;
	checkj:
	while (j > 4) {
		console.log(j);
		j -= 1;
		if ((j % 2) === 0) {
			continue checkj;
		}
		console.log(j + ' is odd.');
	}
	console.log('i = ' + i);
	console.log('j = ' + j);
}