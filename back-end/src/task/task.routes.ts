import AuthMiddleware from '../../middleware/auth.middleware'
import {
    createTask,
    fetchTasks,
    fetchTaskById,
    updateTask,
    deleteTask,
    fetchTasksByKanban,
    fetchTaskByProjectId,
    fetchTasksByKanbanWithProject
} from './task.controller'
import express from 'express'
const router = express.Router()

router.post('/', AuthMiddleware, createTask)
router.get('/', AuthMiddleware, fetchTasks)
router.get('/kanban', AuthMiddleware, fetchTasksByKanban)
router.get('/kanban/:projectId', AuthMiddleware, fetchTasksByKanbanWithProject)
router.get('/:id', AuthMiddleware, fetchTaskById)
router.get('/project/:projectId', AuthMiddleware, fetchTaskByProjectId)
router.put('/:id', AuthMiddleware, updateTask)
router.delete('/:id', AuthMiddleware, deleteTask)

export default router