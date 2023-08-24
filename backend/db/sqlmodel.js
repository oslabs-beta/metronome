import pg from 'pg';
// const { Pool } = pg
import EventEmitter from 'events';

const conString =
  "postgres://sngvhbyc:pYhqjGdztQrLhtOQ0Hp0Uk_RgRU6Lr70@hansken.db.elephantsql.com/sngvhbyc"; //Can be found in the Details page
var db = new pg.Client(conString);

const dbEmitter = new EventEmitter();
db.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  db.query('SELECT NOW() AS "theTime"', function (err) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("connected to database");
    // >> output: 2018-08-23T14:02:57.117Z
    // db.end();
    dbEmitter.emit("dbConnected");
  });
});

export {db, dbEmitter};
