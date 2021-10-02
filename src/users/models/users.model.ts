import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarUrl: string;
}
