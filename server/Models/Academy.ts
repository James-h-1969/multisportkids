import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AcademySchema = new Schema({
    name:String,
    time:String,
    start:String,
    Location:String,
    dates: Array
})

const AcademyModel = mongoose.model("Academy", AcademySchema);

export default AcademyModel;