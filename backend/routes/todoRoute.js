import { createTodo } from "../controller/todoControler.js";
import express from 'express'
import { authMiddleware } from "../middleware/auth.js";

const todoRouter = express.Router();

todoRouter.post('/create-todo',authMiddleware,createTodo);
export default todoRouter;
