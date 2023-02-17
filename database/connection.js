const knexy = require('knex');
const moment = require('moment');
/*const { setTypeParser, builtins } = require('pg').types;

setTypeParser(builtins.DATE, val => moment(val).format('YYYY-MM-DD'));
setTypeParser(builtins.TIME, val => moment(val).format('HH:mm:ss'));
setTypeParser(builtins.TIMETZ, val => moment(val).format('HH:mm:ss'));
setTypeParser(builtins.TIMESTAMP, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
setTypeParser(builtins.TIMESTAMPTZ, val => moment(val).format('YYYY-MM-DD HH:mm:ss'));*/

var knex = knexy({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'apitransporte'
    },
    searchPath: ['knex', 'public'],
  });

module.exports = knex