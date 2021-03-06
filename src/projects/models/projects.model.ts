import * as mongoose from 'mongoose';
export interface Project extends mongoose.Document {
  name: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;

  image: string;
  imageUrl: string;

  status: boolean;
  slug: string;
  createdAt: Date;
}
