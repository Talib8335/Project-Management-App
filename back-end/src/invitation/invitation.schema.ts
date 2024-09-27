import mongoose, {Schema, model} from 'mongoose'

const modelSchema = new Schema({
	admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    member: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'invited',
        enum: ['invited', 'accepted', 'rejected']
    }
},{timestamps: true})

const InvitationSchema = model("Invitation", modelSchema)

export default InvitationSchema