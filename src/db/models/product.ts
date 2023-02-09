import mongoose from "mongoose"

const schema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, ref: 'User', unique: true},
})

export default mongoose.models.Product || mongoose.model('Product', schema)