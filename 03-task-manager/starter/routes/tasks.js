const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} = require("../controllers/tasks");

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
