koa-rethinkdb
=============

Koa middleware that gets you a RethinkDB client via connection pool.

It handles acquire and release connection automatically.

Installation
------------

    npm install --save koa-rethinkdb

Use
---

    var rethinkdbPool = require('koa-rethinkdb');

    var options = {
        host:'localhost',
        port:28015,
        db:'marvel',
        authKey:'hunter2'
    };

    app.use(rethinkdbPool(options, maxConcurrentConnection || 10, minConcurrentConnection || 2, idleTimeoutMillis || 30000));

Better Usage
------------

    var rethinkdbPool = require('koa-rethinkdb');
    var r             = require('rethinkdb');
    var chan          = require('chan');

    app.use(rethinkdbPool(options));
    app.use(function *(next) {

        // get the list of table
        var ch1 = chan();
        var query1 = r.db('test').tableList().run(this.rethinkdb, ch1);

        var list = yield ch1;

        // select a few documents
        ch2 = chan();
        r.db('test').table('foobar').limit(10).run(this.rethinkdb, ch2);
        cursor = yield ch2;

        result = yield cursor.toArray;

        yield next;
        // connections are released back to the pool.
    });

Licence
-------
MIT
