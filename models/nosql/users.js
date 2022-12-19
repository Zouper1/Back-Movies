const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: false, //TODO añade createdAt y updatedAt
    versionKey: false
  }
);
userSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("user", userSchema);