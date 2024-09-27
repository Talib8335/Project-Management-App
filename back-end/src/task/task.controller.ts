import { Request, Response } from 'express'
import TaskSchema from './task.schema'
import Catch from '../../lib/catch.lib'
import { AuthBodyInterface } from '../../middleware/auth.middleware'
import redis from '../../lib/redis.lib'
import { ObjectId } from 'mongodb'
const EXPIRE_CATCH = 86400

export const createTask = Catch(async (req: Request, res: Response)=>{
	const task = new TaskSchema(req.body) 
	await task.save()
	res.json(task)
})

export const fetchTasks = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const tasks = await TaskSchema.find({owner: req.user._id})
	.populate('members', 'fullname email')
	.populate('owner', 'fullname email')
	res.json(tasks)
})

export const fetchTasksByKanban = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const redisCatch = await redis.get(req.user._id)
	if(redisCatch)
		return res.json(JSON.parse(redisCatch))

	const tasks = await TaskSchema.aggregate([
		{
			$match: {owner: new ObjectId(req.user._id)}
		},
		{
			$group: {
				_id: '$status',
				tasks: {
					$push: {
						_id: '$_id',
						title: '$title',
						description: '$description',
						owner: '$owner',
						members: '$members',
						priority: '$priority',
						deadline: '$deadline',
						attachments: '$attachments',
						status: '$status',
						createdAt: '$createdAt',
						updatedAt: '$updatedAt'
					}
				}
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	])
	await redis.setEx(req.user._id, EXPIRE_CATCH, JSON.stringify(tasks))
	res.json(tasks)
})

export const fetchTasksByKanbanWithProject = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const redisCatch = await redis.get(req.params.projectId)
	if(redisCatch)
		return res.json(JSON.parse(redisCatch))

	const tasks = await TaskSchema.aggregate([
		{
			$match: {
				owner: new ObjectId(req.user._id),
				project: new ObjectId(req.params.projectId)
			}
		},
		{
			$group: {
				_id: '$status',
				tasks: {
					$push: {
						_id: '$_id',
						title: '$title',
						description: '$description',
						owner: '$owner',
						members: '$members',
						priority: '$priority',
						deadline: '$deadline',
						attachments: '$attachments',
						status: '$status',
						createdAt: '$createdAt',
						updatedAt: '$updatedAt'
					}
				}
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	])
	await redis.setEx(req.params.projectId, EXPIRE_CATCH, JSON.stringify(tasks))
	res.json(tasks)
})

export const fetchTaskById = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const task = await TaskSchema.findById(req.params.id)
	
	if(!task)
		throw new Error("Failed to fetch task with id")

	res.json(task)
})

export const updateTask = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const isProject = req.query.project
	const task: any = await TaskSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
	const key = isProject === 'true' ? task.project.toString() : req.user._id
	
	if(!task)
		throw new Error("Failed to update task with id")

	await redis.del(key)
	res.json(task)
})

export const deleteTask = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const task = await TaskSchema.findByIdAndDelete(req.params.id)
	
	if(!task)
		throw new Error("Failed to delete task with id")

	res.json(task)
})

export const fetchTaskByProjectId = Catch(async (req: AuthBodyInterface, res: Response)=>{
	const projectId = req.params.projectId
	const tasks = await TaskSchema.find({project: projectId})
	.populate('members', 'fullname email')
	.populate('owner', 'fullname email')
	res.json(tasks)
})
