import * as sqlite from 'better-sqlite3-with-prebuilds';

const conn = new sqlite('./picture.db');

export default conn.db;