import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const CoachSchema = new Schema({
    name: String,
    sessions: Array,
    imgName: String
});

const CoachModel = mongoose.model("Coach", CoachSchema);

export default CoachModel;