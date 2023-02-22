import express from "express";

const router = express.Router();

import {
	getAllTasks,
	getTask,
	updateTask,
	deleteTask,
	createTask,
} from "../controllers/tasks.controller";

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);

export default router;
