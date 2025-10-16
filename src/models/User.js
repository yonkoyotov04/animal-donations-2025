import { Schema, model, Types } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "An email is required"],
        minLength: [10, "Your email is too short"],
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minLength: [4, "Your password is too short"]
    }
})

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12);
})

const User = model("User", userSchema);

export default User;