import { createTodo, deleteAllTodo, deleteTodo, editTodo, getAllTodo } from "../controller/todoControler.js";
import express from 'express'
import { authMiddleware } from "../middleware/auth.js";

const todoRouter = express.Router();

todoRouter.post('/create-todo',authMiddleware,createTodo);
todoRouter.post('/edit-todo/:todoId',authMiddleware,editTodo);
todoRouter.delete('/delete-todo/:todoId',authMiddleware,deleteTodo);
todoRouter.delete('/delete-all-todo',authMiddleware,deleteAllTodo);
todoRouter.get('/get-all-todo',authMiddleware,getAllTodo);

export default todoRouter;
