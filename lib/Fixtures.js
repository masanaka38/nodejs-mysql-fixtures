var mysql = require('mysql')
    ,jsYaml = require('js-yaml')
    ,async = require('async')
    ,path = require('path');

function Fixtures(poolConfig) {
  this._pool = mysql.createPool(poolConfig);
}
module.exports = Fixtures;

Fixtures.prototype._getConnection = function(cb) {
  if(!this._pool) {
    throw 'datasource not initialized'
  }
  this._pool.getConnection(cb);
}

Fixtures.prototype.close = function() {
  this._pool.end();
}

Fixtures.prototype.create = function(filename, cb) {
  var self = this;
 
  self._getConnection(function(err, conn) {
    if(err) throw err;

    fixtures = require(path.resolve(filename));
    // console.log(fixtures);

    var queue = async.queue(function(task, cb) {
      if(task.sql !== undefined) {
        console.log(task.sql);
        conn.query(task.sql, cb);
      } else {
        self._insertDB(conn, task.tablename, task.record, cb);
      }
    }, 1);

    queue.drain = function() {
      cb(null);
    }

    var err_func = function(err) {
      if(err) throw err;
    }

    queue.push({ 'sql' : 'set foreign_key_checks=0' });
    for(var tablename in fixtures) {
      queue.push({ 'sql' : 'truncate ' + tablename }, err_func);
    }
    queue.push({ 'sql' : 'set foreign_key_checks=1' });

    for(var tablename in fixtures) {
      for(var record_name in fixtures[tablename]) {
        queue.push({ 'tablename' : tablename, 'record' : fixtures[tablename][record_name] }, err_func);
      }
    }
  });
}


Fixtures.prototype._insertDB = function(conn, tablename, fixture, cb) {
  var sql = "insert into " + tablename + "(";
  var val = "";
  var values = [];
  var first = true;

  for(var key in fixture) {
    if(!first) {
      sql += ",";
      val += ",";
    }
    first = false
    sql += key;
    val += "?";
    values.push(fixture[key]);
  }
  sql += ") values(" + val + ")";

  console.log(sql, values);
  conn.query(sql, values, cb);
}
