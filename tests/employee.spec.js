define(['chai', '../src/person', '../src/employee'], function(chai, Person, Employee) {
  var expect = chai.expect;
  describe('Employee', function() {
    it('exists', function() {
      expect(Employee).to.be.a('function');
    });

    it('subclasses Person', function() {
      var andrew = new Employee('Andrew', 'Noyes', 'Web Developer');
      expect(andrew).to.be.an.instanceof(Person);
    });

    describe('title', function() {
      it('exists', function() {
        var andrew = new Employee('Andrew', 'Noyes', 'Web Developer');
        expect(andrew).to.have.property('title');
        expect(andrew.title).to.equal('Web Developer');
      });
    });

    describe('signature', function() {
      it('exists', function() {
        var andrew = new Employee('Andrew', 'Noyes', 'Web Developer');
        expect(andrew).to.have.property('signature');
        expect(andrew.signature).to.equal('Andrew Noyes, Web Developer')
      });
    });
  });
});