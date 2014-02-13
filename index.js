// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  var Pool, debug;

  debug = require('debug')('koa-rethinkdb');

  Pool = require('rethinkdb-pool');


  /*
  koa rethinkdb middleware
  
  @param {Object} options
  @api public
  @return {Koa-middleware}
   */

  module.exports = function(options) {
    var gen, pool;
    pool = Pool(options);
    debug('created connection pool with option: %j', options);
    gen = function*(next) {
      var connection, e;
      try {
        connection = yield pool.acquire;
      } catch (_error) {
        e = _error;
        return debug('faild to acquire connection with error: %s', error.message);
      }
      this.rethinkdb = connection;
      try {
        yield next;
      } catch (_error) {
        e = _error;
        this.rethinkdb = void 0;
        pool.release(connection);
        throw e;
      }
    };
    gen._name = 'koa-rethinkdb';
    return gen;
  };

}).call(this);