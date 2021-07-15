try {
	console.log('try');
	throw 'some error';
	console.log('unreachable');
}
catch (err) {
	console.log(err);
}
finally {
	console.log('finally');
}
