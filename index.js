var curry = require('curry');
var asyncEarlyError = require('async-early-error');

module.exports = curry(function asyncFlatMap(iter, xs, cb) {
	var ys = [], back = 0;
	xs.forEach(function(x, i) {
		iter(x, asyncEarlyError(cb, function(y) {
			ys[i] = y;
			if(++back === xs.length) {
				cb(null, ys.reduce(function(yss, y) {
					return yss.concat(y);
				}, []));
			}
		}));
	});
});
