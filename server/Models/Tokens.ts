import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const TokensSchema = new Schema({
    singleTokens: Array,
    groupTokens: Array,
});

const TokenModel = mongoose.model("Token", TokensSchema);

export default TokenModel;