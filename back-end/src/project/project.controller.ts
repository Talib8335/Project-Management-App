import { Request, Response } from 'express'
import ProjectSchema from './project.schema'
import Catch from '../../lib/catch.lib'
import { AuthBodyInterface } from '../../middleware/auth.middleware'

export const fetch = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const projects = await ProjectSchema.find({owner: req.user._id})
	res.json(projects)
})

export const createProject = Catch(async (req: AuthBodyInterface, res: Response)=>{
	req.body.owner = req.user._id
	const project = new ProjectSchema(req.body)
	project.save()
	res.json(project)
})