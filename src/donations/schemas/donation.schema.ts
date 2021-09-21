import * as mongoose from 'mongoose';

export const DonationsSchema = new mongoose.Schema({
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
