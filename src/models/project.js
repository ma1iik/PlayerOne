const db = require("./db");

const Project = {
  create: (projectData, callback) => {
    const query = "INSERT INTO projects SET ?";
    db.query(query, projectData, callback);
  },
  findByUserId: (userId, callback) => {
    const query = "SELECT * FROM projects WHERE user_id = ?";
    db.query(query, [userId], callback);
  },
  findById: (id, callback) => {
    const query = "SELECT * FROM projects WHERE id = ?";
    db.query(query, [id], callback);
  },
  update: (id, updatedData, callback) => {
    const query = "UPDATE projects SET ? WHERE id = ?";
    db.query(query, [updatedData, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM projects WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Project;
