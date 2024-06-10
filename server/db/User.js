var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

var UserSchema = new mongoose.Schema(
  {
    walletAddress: String,
    points: Number,
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);
User = mongoose.model("User", UserSchema, "Users");
module.exports = User;
