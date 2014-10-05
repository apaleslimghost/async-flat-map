var expect = require('expect.js');
var asyncFlatMap = require('./');
var timer = require('timer-shim');

describe('async-flat-map', function() {
	beforeEach(function() {
		this.timer = new timer.Timer();
		this.timer.pause();
	});

	it('should flatmap asynchronously', function(done) {
		asyncFlatMap(function(x, cb) {
			cb(null, [x, x * 2]);
		}, [1,2,3], function(e, ys) {
			expect(ys).to.eql([1,2,2,4,3,6]);
			done(e);
		});
	});
});

