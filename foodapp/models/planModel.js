let mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number
  },
  price: {
    type: Number
  },
  delivery: {
    type: Boolean
  },
  meals: {
    type: Number
  },
  description: {
    type: String
  },
});

const planModel = mongoose.model("planModel",planSchema);

