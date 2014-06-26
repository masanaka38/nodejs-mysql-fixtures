var mysql = require('mysql')
    , path = require('path');

function MySqlAssertHelper(poolConfig) {
  this._pool = mysql.createPool(poolConfig);
}
module.exports = MySqlAssertHelper;

MySqlAssertHelper.prototype.assert = function(sql, filename, cb) {
  var self = this;

  self._pool.getConnection(function(err, conn) {
    if(err) throw err;

    conn.query(sql, null, function(err, rows) {
      if(err) throw err;

      data = require(path.resolve(filename));

      expect(rows.length).toBe(self._length(data));
      var idx = 0;
      for(var key in data) {
        self._assert(rows[idx++], data[key]);
      }
      cb();
    });
  });
}

MySqlAssertHelper.prototype._assert = function(row, data) {
  for(var key in data) {
    expect(data[key]).toBe(row[key]);
  }
}

MySqlAssertHelper.prototype._length = function(obj) {
  var len = 0;
  for(var key in obj) len++;
  return len;
}
