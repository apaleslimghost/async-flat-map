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

	it('should pass first error along', function(done) {
		var e = {};
		asyncFlatMap(function(x, cb) {
			if(x === 2) {
				cb(e);
			} else cb(null, [x, x*2]);
		}, [1,2,3], function(err) {
			expect(e).to.be(e);
			done();
		});
	});

	it('should run in parallel', function(done) {
		var that = this;

		asyncFlatMap(function(x, cb) {
			that.timer.setTimeout(function() {
				cb(null, [x, x * 2]);
			}, 100);
		}, [1,2,3], function(e, ys) {
			expect(ys).to.eql([1,2,2,4,3,6]);
			done(e);
		});

		this.timer.wind(100); // would take 300ms in series
	});
});

