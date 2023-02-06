import mongoose from "mongoose"

const schema = new mongoose.Schema({
  username: {type: String, required: true},
  passwordHash: {type: String, required: true},
  reminders: {type: [String], default: []}, //must be populated by 'remiders'
  notes: {type: [String], default: []} // must be populated by 'notes'
})

export default mongoose.models.User || mongoose.model("User", schema)