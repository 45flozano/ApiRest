var mongoose = require("mongoose");
const { Schema } = mongoose;

var UserSchema = Schema({
  name: {
    type: String,
    require: true,
    max: 150,
  },
  age: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
