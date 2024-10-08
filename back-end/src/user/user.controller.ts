import { NextFunction, Request, Response } from "express"
import UserSchema from "./user.schema"
import { ForgotRequestDto, GetTokenDto, LoginDto, SignupDto } from "./user.dto"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Catch from '../../lib/catch.lib'
import { createOtp, verifyOtp } from "../otp/otp.controller"
import crypto from "crypto"
import SendEmail from '../../lib/mail.lib'

const tenMinute = 600000
const oneMonth = 2592000000
const fiveMinute = 300000

const getToken = (user: GetTokenDto)=>{
    user.password = undefined
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: tenMinute})
    const refreshToken = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN_SECRET as string, {expiresIn: oneMonth})
    return {accessToken, refreshToken}
}

export const signup = Catch(async (req: Request, res: Response)=>{
    const body: SignupDto = req.body
    const user = new UserSchema(body)
    await user.save()
    res.json({success: true})
})

export const login = Catch(async (req: Request, res: Response)=>{
    const body: LoginDto = req.body
        const user = await UserSchema.findOne({email: body.email})
        
        if(!user) 
            return res.status(404).json({
                success: false,
                message: 'User doesn`t exist !'
            })

        const auth = await bcrypt.compare(body.password, user.password)

        if(!auth)
            return res.status(401).json({
                success: false,
                message: 'Incorrect password !'
            })

        // Do after user login
        const {accessToken, refreshToken} = getToken(user.toObject())

        // Release previous session
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        // Creating new session
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: tenMinute,
            secure: process.env.PROD === "true" ? true : false,
            domain: process.env.USER_AGENT
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: oneMonth,
            secure: process.env.PROD === "true" ? true : false,
            domain: process.env.USER_AGENT
        })
        res.json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        })
})

export const logout = Catch((req: Request, res: Response)=>{
    res.clearCookie("accessToken", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.PROD === "true" ? true : false,
        domain: process.env.USER_AGENT
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        maxAge: 0,
        secure: process.env.PROD === "true" ? true : false,
        domain: process.env.USER_AGENT
    })

    res.json({success: true})
})

export const forgotPassword = Catch(async (req: Request, res: Response, next: NextFunction)=>{
  const body: ForgotRequestDto = req.body  
  const user = await UserSchema.findOne({email: body.email})
  
  if(!user)
    return res.status(404).json({success: false, message: 'User doesn`t exists !'})

  const otp = crypto.randomBytes(4).toString('hex').toUpperCase()
  const isSend = await SendEmail(body.email, "Otp Verificate", `This is your otp - ${otp}`)

  if(!isSend)
    return res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
    
  req.body.code = otp
  req.body.disableMicroservice = true
  await createOtp(req, res, next)
  
  const token = jwt.sign({id: user._id}, process.env.FORGOT_SECRET as string, {expiresIn: fiveMinute})
  res.json({success: true, token: token})
})

export const changePassword = Catch(async (req: Request, res: Response, next: NextFunction)=>{
    req.body.disableMicroservice = true
    const isVerified = await verifyOtp(req, res, next)

    if(!isVerified)
        return res.status(401).json({
            success: false,
            message: 'Invalid otp'
        })

    await UserSchema.findByIdAndUpdate(req.params.id, {password: req.body.password})
    res.json({success: true})
})

export const refreshToken = Catch(async (req: Request, res: Response)=>{
    const user: any = await UserSchema.findById(req.params.id)
    const {accessToken, refreshToken} = getToken(user.toObject())
    
    // Release previous session
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    // Creating new session
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: tenMinute,
        secure: process.env.PROD === "true" ? true : false,
        domain: process.env.USER_AGENT
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: oneMonth,
        secure: process.env.PROD === "true" ? true : false,
        domain: process.env.USER_AGENT
    })
    res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email
    })
})

// Helper 
export const fetchUserByEmail = Catch(async (req: Request, res: Response)=>{
    const user = await UserSchema.findOne({email: req.body.email}, {_id: 1})

    if(!user)
        throw new Error("User doesn`t exist")

    return user
})