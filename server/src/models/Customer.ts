import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const CustomerSchema = new Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: String,
})


const CustomerModel = mongoose.model("Customer", CustomerSchema);

export default CustomerModel;