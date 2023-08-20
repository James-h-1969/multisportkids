import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CampSchema = new Schema({
    name: String,
    ages: String,
    date: String,
    times: String,
    Price: Number,
    Location: String,
    address: String,
    locPic: String,
    kidsDay1: Array,
    kidsDay2: Array
})

const CampModel = mongoose.model("Camp", CampSchema);

export default CampModel;