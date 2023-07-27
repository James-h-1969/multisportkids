import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const CoachSchema = new Schema({
    name: String,
    dates: Array,
    times: Array,
    location: String,
});

const CoachModel = mongoose.model("Coach", CoachSchema);

export default CoachModel;