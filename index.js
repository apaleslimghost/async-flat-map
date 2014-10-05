var curry = require('curry');
var asyncEarlyError = require('async-early-error');

module.exports = curry(function asyncFlatMap(iter, xs, cb) {
	var ys = [], back = 0, erred = false;
	xs.forEach(function(x, i) {
		iter(x, asyncEarlyError(function(e) {
			if(!erred) {
				cb(e);
				erred = true;
			}
		}, function(y) {
			ys[i] = y;
			if(!erred && ++back === xs.length) {
				cb(null, ys.reduce(function(yss, y) {
					return yss.concat(y);
				}, []));
			}
		}));
	});
});
