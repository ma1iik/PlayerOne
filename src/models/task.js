const db = require("./db");

const Task = {
  create: (taskData, callback) => {
    const query = "INSERT INTO tasks SET ?";
    db.query(query, taskData, callback);
  },
  findByUserId: (userId, callback) => {
    const query = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(query, [userId], callback);
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM tasks WHERE id = ?";
    db.query(query, [id], callback);
  },
  update: (id, updatedData, callback) => {
    const query = "UPDATE tasks SET ? WHERE id = ?";
    db.query(query, [updatedData, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Task;
