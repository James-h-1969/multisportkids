import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    parentname: String,
    email: String,
    phone: String,
    childNames: Array,
    childAge: Array,
    childClubs: Array,
    childComments: Array,
    childEvents: Array,
});

const ParentModel = mongoose.model("Parent", ParentSchema);

export default ParentModel;