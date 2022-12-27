const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const MoviesSchema = new mongoose.Schema(
  {
    nameMovie: {
      type: String,
    },

    imageMovie: {
      type: String,
    },

    price: {
      type: Number,
    },

    time1: {
      type: String,
    },
    time2: {
      type: String,
    },
    time3: {
      type: String,
    },

    descriptionMovie: {
      type: String,
    },
  },
  {
    timestamps: false, //TODO añade createdAt y updatedAt
    versionKey: false,
  }
);
MoviesSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("movies", MoviesSchema);
