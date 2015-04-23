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
        expect(andrew).to.have.ownProperty('firstName');
        expect(andrew.firstName).to.equal('Andrew');
      });
    });
  });
});