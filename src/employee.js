define(['./person'], function(Person) {
  var Employee = function(firstName, lastName, title) {
    Person.call(this, firstName, lastName);
    this.title = title;
  };

  Employee.prototype = Object.create(Person.prototype, {
    constructor: {
      value: Employee
    },

    signature: {
      get: function() {
        return this.fullName + ', ' + this.title;
      }
    }
  });

  return Employee;
});