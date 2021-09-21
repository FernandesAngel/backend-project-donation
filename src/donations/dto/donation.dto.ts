import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import * as mongoose from 'mongoose';

export class DonationDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  method: string;

  @IsNotEmpty()
  project: mongoose.Schema.Types.ObjectId;

  createdAt: Date;
}
