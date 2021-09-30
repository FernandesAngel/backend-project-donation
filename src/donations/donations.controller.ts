import { UpdateDonationDto } from './dto/updateDonation.dto';
import { DonationDto } from './dto/donation.dto';
import { DonationsService } from './donations.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Donation } from './models/donations.model';
import * as mongoose from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<Donation[]> {
    return this.donationsService.findAll();
  }

  @Get('project/:id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async findByProject(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ): Promise<Donation[]> {
    return this.donationsService.findByProject(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() donationDto: DonationDto): Promise<Donation> {
    return this.donationsService.create(donationDto);
  }
}
