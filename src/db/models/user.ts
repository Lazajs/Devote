import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: {type: String, required: true, unique:true},
  passwordHash: {type: String, required: true},
})

export default mongoose.models.User || mongoose.model("User", schema)