import { PartialType } from '@nestjs/mapped-types';
import { DonationDto } from './donation.dto';

export class UpdateDonationDto extends PartialType(DonationDto) {}
