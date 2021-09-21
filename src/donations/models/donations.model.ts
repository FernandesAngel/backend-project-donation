import * as mongoose from 'mongoose';
export interface Donation extends mongoose.Document {
  price: number;
  method: string;
  project: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
