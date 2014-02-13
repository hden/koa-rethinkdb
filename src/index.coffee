'use strict'

debug = require('debug')('koa-rethinkdb')
Pool  = require('rethinkdb-pool')

###
koa rethinkdb middleware

@param {Object} options
@api public
@return {Koa-middleware}
###

module.exports = (options) ->
  pool = Pool(options)
  debug 'created connection pool with option: %j', options
  gen  = (next) -->
    try
      # grab a connection from the connection pool
      connection = yield pool.acquire
    catch e
      return debug 'faild to acquire connection with error: %s', error.message

    @rethinkdb = connection

    try
      yield next
    catch e
      # the connection must be released regardless of downstream error
      @rethinkdb = undefined
      pool.release connection
      throw e

  gen._name = 'koa-rethinkdb'
  gen
