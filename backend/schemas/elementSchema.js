const mongoose = require("mongoose");

const { Schema } = mongoose;

const elementSchema = new Schema(
  {
    elementNumber: { type: String, required: true },
    elementLabel: { type: String, required: true },
    elementDescription: { type: String, required: true },
    elementFormat: { type: String, required: true },
    elementDuration: { type: String, required: true }, // Probably change type to Num
    elementCategory: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    elementSubCategory: { type: String, required: true },
    elementMarket: { type: String, required: true },
    elementCogRating: { type: Number, required: true },
    elementPhysRating: { type: Number, required: true },
    elementLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = elementSchema;
