const db = require("./db");

const Habit = {
  create: (habitData, callback) => {
    const query = "INSERT INTO habits SET ?";
    db.query(query, habitData, callback);
  },
  findByUserId: (userId, callback) => {
    const query = "SELECT * FROM habits WHERE user_id = ?";
    db.query(query, [userId], callback);
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM habits WHERE id = ?";
    db.query(query, [id], callback);
  },
  update: (id, updatedData, callback) => {
    const query = "UPDATE habits SET ? WHERE id = ?";
    db.query(query, [updatedData, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM habits WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Habit;
