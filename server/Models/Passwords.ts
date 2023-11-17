import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PasswordSchema = new Schema({
    name: String,
    passwordHashed: String
})

const PasswordModel = mongoose.model("Password", PasswordSchema);

export default PasswordModel;