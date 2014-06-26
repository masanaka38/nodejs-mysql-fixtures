var Fixtures = require('./lib/Fixtures')
    , MySQLAssertHelper = require('./lib/MySQLAssertHelper');

module.exports.createFixtures = function(config) {
  return new Fixtures(config);
};

module.exports.createHelper = function(config) {
  return new MySQLAssertHelper(config);
};