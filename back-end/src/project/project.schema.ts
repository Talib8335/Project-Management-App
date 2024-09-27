import mongoose, {Schema, model} from 'mongoose'

const modelSchema = new Schema({
	title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

const ProjectSchema = model("Project", modelSchema)

export default ProjectSchema