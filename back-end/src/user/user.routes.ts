import express from 'express'
const router = express.Router()
import { signup, login, forgotPassword, logout, changePassword, refreshToken } from './user.controller'
import { ForgotToken, Refresh } from './user.middleware'

router.post('/signup', signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh-token", Refresh, refreshToken)
router.post("/forgot-password", forgotPassword)
router.post("/change-password", ForgotToken, changePassword)

export default router