import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const CoachBookedSchema = new Schema({
    coachName: String,
    time: String,
    date: String,
    kidName: String,
});

const CoachBookedModel = mongoose.model("CoachBooked", CoachBookedSchema);

export default CoachBookedModel;