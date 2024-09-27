import {sendInvitation, updateInvitation, fetchInvited, fetchMineInvitation} from './invitation.controller'
import express from 'express'
import AuthMiddleware from '../../middleware/auth.middleware'
import InvitationMiddleware from './invitation.middleware'
const router = express.Router()


router.get('/invited', AuthMiddleware, fetchInvited)
router.get('/mine', AuthMiddleware, fetchMineInvitation)
router.post('/', AuthMiddleware, InvitationMiddleware, sendInvitation)
router.put('/:id', AuthMiddleware, updateInvitation)

export default router