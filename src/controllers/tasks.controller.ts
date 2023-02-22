import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

import catchAsyncErrors from "../utils/catch-async-errors.util";
import Task from "../models/tasks.model";

const getAllTasks = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const tasks = await Task.find();

		res.status(200).json({
			status: " success",
			tasks,
		});
	}
);

const getTask = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const task = await Task.findById(req.params.id);

		res.status(200).json({
			status: "success",
			task,
		});
	}
);

const createTask = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const task = await Task.create(req.body);

		res.status(201).json({
			status: "success",
			task,
		});
	}
);

const updateTask = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const update = req.body;

		const task = await Task.findByIdAndUpdate(id, update, { new: true });

		if (!task) {
			return next(createError(404, "Task is not found!"));
		}

		res.status(200).json({
			status: "success",
			task,
		});
	}
);

const deleteTask = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		const task = await Task.findByIdAndDelete(req.params.id);

		if (!task) {
			return next(createError(404, "Task is not found!"));
		}

		res.status(204).json({
			status: "success",
		});
	}
);

export { getAllTasks, getTask, updateTask, deleteTask, createTask };
