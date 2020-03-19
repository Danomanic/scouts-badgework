const db = require('../utils/db');

const login = (name, section) => new Promise((resolve, reject) => {
  const dbo = db.db('badgework').collection('users');
  dbo.findOne({ name, section }, (finderr, finddata) => {
    if (finderr) reject(finderr);
    if (!finddata) {
      dbo.insertOne({
        name,
        section,
        existing: true,
      }, (inserterr, insertdata) => {
        if (inserterr) reject(inserterr);
        resolve({
          _id: insertdata.insertedId,
          name,
          section,
          existing: false,
        });
      });
    } else {
      resolve(finddata);
    }
  });
});

module.exports = { login };
