import AuthMiddleware from '../../middleware/auth.middleware'
import {createProject, fetch} from './project.controller'
import express from 'express'
const router = express.Router()

router.get('/', AuthMiddleware, fetch)
router.post('/', AuthMiddleware, createProject)

export default router