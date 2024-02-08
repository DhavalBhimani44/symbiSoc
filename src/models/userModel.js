import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type : Int,
        required : [true, "Please provide an username"],
        unique : true,
    },
    password: {
        type : String,
        required : [true, "Please provide a password"],
    },
    // forgotPasswordToken : String,
    // forgotPasswordTokenExpiry : Date,
    // verifyToken : String,
    // verifyTokenExpiry : Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;