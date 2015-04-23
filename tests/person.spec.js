define(['chai', '../src/person'], function(chai, Person) {
  var expect = chai.expect;

  describe('Person', function() {
    it('exists', function() {
      expect(Person).to.not.equal(undefined);
      expect(Person).to.be.a('function');
    });

    describe('firstName', function() {
      it('has a firstName property', function() {
        var andrew = new Person('Andrew', 'Noyes');
        expect(andrew).to.have.property('firstName');
        expect(andrew.firstName).to.equal('Andrew');
      });
    });

    describe('lastName', function() {
      it('has a lastName property', function() {
        var andrew = new Person('Andrew', 'Noyes');
        expect(andrew).to.have.property('lastName');
        expect(andrew.lastName).to.equal('Noyes');
      });
    });

    describe('fullName', function() {
      it('has a "fullName" property', function() {
        var andrew = new Person('Andrew', 'Noyes');
        expect(andrew).to.have.property('fullName');
        expect(andrew.fullName).to.equal('Andrew Noyes');
      });
    });
  });
});