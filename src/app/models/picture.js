import db from '@/database/conn';

export const getPictures = () => {
  const sql = "SELECT * FROM pictures";
  const stmt = db.prepare(sql);
  return stmt.all();
}