const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
  stageName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  birthName: {
    type: String,
    required: true,
  },
  image: {
      type: String,
      required: true,
    },
    // cloudinaryId: {
    //     type: String,
    //     require: true,
    // },
    otherNames: [{
      type: String,
      required: true,
    }],
    birthYear: {
      type: Number,
      required: true,
    },
    birthLocation: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    genre: [{
      type: String,
      required: true,
    }],
    occupation: [{
      type: String,
      required: true,
    }],
    yearsActive: {
      start: { type: Number, required: true },
      end: { type: Number, required: true }
    },
    labels: [{
      type: String,
      required: true,
    }],
    children: {
    type: String,
    required: true,
    },
    favorite: {
    type: Number,
    required: true,
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
});

module.exports = mongoose.model("Artist", ArtistSchema);
