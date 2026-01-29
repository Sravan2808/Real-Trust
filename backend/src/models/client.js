const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Client description is required"],
    },
    designation: {
      type: String,
      required: [true, "Client designation is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Client image is required"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
