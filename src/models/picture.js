const path = require('path');
const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database(':memory:');
db.run('CREATE TABLE IF NOT EXISTS pictures (id INT, name TEXT)');

export default class Picture {
  store() {
    const sql = `INSERT INTO pictures (name) VALUES (?)`;
    db.run(sql, ['testing'], function(err) {
      if (err) {
        return console.log(err.message, path.join(__dirname, '../database/picture.db'));
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // close the database connection
  }
  get() {
    const sql = `SELECT * FROM pictures`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.name);
      });
    });
  }
}
