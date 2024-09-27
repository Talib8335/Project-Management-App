import { Request, Response } from 'express'
import OtpSchema from './otp.schema'
import Catch from '../../lib/catch.lib'
import { OtpDto } from './otp.dto'
import moment from 'moment'

export const createOtp = Catch(async (req: Request, res: Response)=>{
	const body: OtpDto = req.body
	const otp = new OtpSchema(body)
	await otp.save()

	if(body.disableMicroservice)
		return otp

	res.json(otp)
})

export const verifyOtp = Catch(async (req: Request, res: Response)=>{
	const otp = req.body.otp
	const disableMicroservice = req.body.disableMicroservice
	const data = await OtpSchema.findOne({code: otp})

	if(!data)
		return disableMicroservice ? 
		false : 
		res.status(401).json({
			success: false,
			message: 'Invalid otp'
		})

	const expiry  = moment(data.createdAt).add(5, 'minutes')
	const currentDateAndTime = moment()
	const isNotExpired = (expiry >= currentDateAndTime)

	if(!isNotExpired)
		return disableMicroservice ? 
		false :
		res.status(401).json({
			success: false,
			message: 'Invalid otp'
		})

	return disableMicroservice ? 
	true :
	res.json({success: true})
})