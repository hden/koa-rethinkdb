koa-rethinkdb
=============

Koa middleware that gets you a RethinkDB client via connection pool.

It handles acquire and release connection automatically.

Installation
------------

    npm install --save koa-rethinkdb

Use
---

    rethinkdbPool = require('koa-rethinkdb');

    options = {
        host:'localhost',
        port:28015,
        db:'marvel',
        authKey:'hunter2'
    };

    app.use(rethinkdbPool(options, maxConcurrentConnection || 10, minConcurrentConnection || 2, idleTimeoutMillis || 30000));

Better Usage
------------

    rethinkdbPool = require('koa-rethinkdb');
    rco = require('rethinkdb-co');
    r = require('rethinkdb');

    app.use(rethinkdbPool(options));
    app.use(function *(next) {

        // get the list of table
        query1 = r.db('test').tableList()
        list = yield rco.run query1

        // select a few documents
        query2 = r.db('test').table('foobar').limit(10)
        cursor = yield rco.run query2

        result = yield cursor.toArray

        yield next;
        // connections are released back to the pool.
    });

Licence
-------
MIT
