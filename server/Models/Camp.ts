import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CampSchema = new Schema({
    name: String,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
})

const CampModel = mongoose.model("Camp", CampSchema);

export default CampModel;