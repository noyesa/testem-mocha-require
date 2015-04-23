define(['chai', 'sinon', '../src/fn'], function(chai, sinon, fn) {
  var expect = chai.expect;

  describe('fn', function() {
    it('exists', function() {
      expect(fn).to.exist;
    });

    describe('isArray', function() {
      it('exists', function() {
        expect(fn)
          .to.have.property('isArray')
          .that.is.a('function');
      });

      it('returns true if the argument is an array', function() {
        expect(fn.isArray([])).to.be.true;
      });

      it('returns false if the argument is not an array', function() {
        var test = [
          function() {},
          {},
          0,
          'foo',
          true
        ];

        test.forEach(function(value) {
          expect(fn.isArray(value)).to.be.false;
        });
      });
    });

    describe('keys', function() {
      it('exists', function() {
        expect(fn)
          .to.have.property('keys')
          .that.is.a('function');
      });

      it('returns all the keys an object has defined on it', function() {
        var a = { foo: 'bar' },
            b,
            keys;

        b = Object.create(a);
        b.biz = 'baz';

        keys = fn.keys(a)
        expect(keys).to.contain('foo');

        keys = fn.keys(b);
        expect(keys)
          .to.contain('biz')
          .and.not.contain('foo');
      });
    });

    describe('map', function() {
      it('exists', function() {
        expect(fn)
          .to.have.property('map')
          .that.is.a('function');
      });

      describe('passing an array as the first argument', function() {
        it('returns the input array if no mapper function is provided', function() {
          var items = ['one', 'two'],
              result = fn.map(items);

          expect(items).to.equal(result);
        });

        it('calls the mapper function for each element in the array', function() {
          var items = ['one', 'two'],
              mapper;

          mapper = sinon.spy();
          fn.map(items, mapper);

          sinon.assert.callCount(mapper, items.length);
        });

        it('passes each value in the array to the mapper function', function() {
          var items = ['one', 'two'],
              mapper = sinon.spy();

          fn.map(items, mapper);
          sinon.assert.calledWith(mapper, 'one');
          sinon.assert.calledWith(mapper, 'two');
        });

        it('returns an array with the return values of each item passed to the mapper', function() {
          var items = [1, 2],
              mapper,
              result;

          mapper = sinon.spy(function(x) {
            return x + 1;
          });

          result = fn.map(items, mapper);
          expect(result)
            .to.be.instanceof(Array)
            .with.length(items.length)
            .that.has.members([2, 3]);
        });

        it('does not call the mapper if the input list is empty', function() {
          var list = [],
              mapper = sinon.spy();

          fn.map(list, mapper);
          sinon.assert.notCalled(mapper);
        });
      });

      describe('passing an object as the first argument', function() {
        it('calls the mapper with values and keys', function() {
          var o = { foo: 'bar' },
              mapper = sinon.spy();

          fn.map(o, mapper);

          sinon.assert.calledWith(mapper, 'bar', 'foo');
          sinon.assert.calledOnce(mapper);
        });

        it('only calls the mapper with own properties', function() {
          var a = { foo: 'bar' },
              b = Object.create(a),
              mapper = sinon.spy();

          b.biz = 'baz';

          fn.map(b, mapper);
          sinon.assert.calledWith(mapper, 'baz', 'biz');
          sinon.assert.neverCalledWith(mapper, 'bar', 'foo');
        });

        it('returns an array containing the mapped values', function() {
          var o = { 'one': 1, 'two': 2 },
              mapper,
              result;

          mapper = sinon.spy(function(x) {
            return x + 1;
          });

          result = fn.map(o, mapper);
          expect(result)
            .to.be.instanceof(Array)
            .with.length(2)
            .with.members([2, 3]);
        });
      });

      describe('context parameter (third parameter)', function() {
        it('calls the mapper with the array as the context by default', function() {
          var items = [1, 2],
              mapper = sinon.spy();

          fn.map(items, mapper);
          sinon.assert.calledOn(mapper, items);
        });

        it('calls the mapper with a custom context if one is provided as third argument', function() {
          var items = [1, 2],
              mapper = sinon.spy(),
              context = {};

          fn.map(items, mapper, context);
          sinon.assert.calledOn(mapper, context);
        });
      });
    });
  });
});