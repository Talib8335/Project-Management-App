import { NextFunction, Request, Response } from 'express'
import InvitationSchema from './invitation.schema'
import Catch from '../../lib/catch.lib'
import {AuthBodyInterface} from '../../middleware/auth.middleware'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { getSocket } from '../../lib/socket.lib'
import UserSchema from '../user/user.schema'
import { fetchUserByEmail } from '../user/user.controller'
axios.defaults.baseURL = process.env.LAMBDA_ENDPOINT

const io = getSocket()
const fiveMinute = 300000

export const fetchInvited = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const invitation = await InvitationSchema.find({admin: req.user._id,...req.query})
	.populate("member", "fullname email")
	.populate("admin", "fullname email")
	res.json(invitation)
})

export const fetchMineInvitation = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const invitation = await InvitationSchema.find({member: req.user._id, status: 'invited'}).populate("admin", "fullname email")
	res.json(invitation)
})

export const sendInvitation = Catch(async (req: AuthBodyInterface, res: Response, next: NextFunction)=>{
	const user = await fetchUserByEmail(req, res, next)
	const invitation = new InvitationSchema({
		member: user._id,
		admin: req.user._id
	})
	await invitation .save()
	const token = jwt.sign({session: Date.now()}, process.env.LAMBDA_MAILER_SECRET as string, {expiresIn: fiveMinute})


	const options = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	await axios.post('/mail', {
		email: req.body.email,
		admin: req.user.fullname
	}, options) 

	io.emit('invitation', {
		member: user._id,
		admin: {
			id: req.user._id,
			email: req.user.email,
			fullname: req.user.fullname
		}
	})

	res.status(200).json(invitation)
})


export const updateInvitation = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const invitation = await Promise.all([
		InvitationSchema.findByIdAndUpdate(req.params.id, req.body, {new: true}),
		UserSchema.findByIdAndUpdate(req.body.admin, {$push: {members: req.user._id}})
	])

	io.emit('invitation-updated', {
		member: req.user._id,
		admin: req.body.admin,
		status: req.body.status
	})
	res.json(invitation)
})

// Helper 
export const fetchInvitationByMemberId = Catch(async (req: Request, res: Response)=>{
	const invitation = await InvitationSchema.findOne({member: req.params.memberId, ...req.query})
	return invitation
})