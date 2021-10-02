import * as mongoose from 'mongoose';

export const ProjectsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ProjectsSchema.virtual('imageUrl').get(function () {
  if (!this.image) {
    return '';
  }
  const newImage = this.image.split('/');
  return `${process.env.BASE_URL}/projects/project/${newImage[2]}`;
});
