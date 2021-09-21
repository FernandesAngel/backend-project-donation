import { UpdateDonationDto } from './dto/updateDonation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Donation } from './models/donations.model';

import * as mongoose from 'mongoose';
import { DonationDto } from './dto/donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel('Donation')
    private readonly donationsModel: mongoose.Model<Donation>,
  ) {}

  public async create(donationDto: DonationDto): Promise<Donation> {
    const donation = new this.donationsModel(donationDto);

    return (await donation.save()).populate('project');
  }
  public async findAll(): Promise<Donation[]> {
    return this.donationsModel.find().populate('project');
  }

  public async findByProject(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<Donation[]> {
    return this.donationsModel.find({ project: id });
  }

  public async update(
    id: string,
    updateDonationDto: UpdateDonationDto,
  ): Promise<Donation> {
    return this.donationsModel.findByIdAndUpdate(id, updateDonationDto);
  }
}
