import mongoose from 'mongoose'
const authSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },

    role: { type: String, enum: ["admin", "client"], default: "client" }
})
const User = mongoose.model('Auth', authSchema)
export default User
