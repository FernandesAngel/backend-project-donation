import { ProjectsService } from './../projects/projects.service';
import { ProjectsModule } from './../projects/projects.module';
import { DonationsSchema } from './schemas/donation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Donation',
        schema: DonationsSchema,
      },
    ]),
    ProjectsModule,
  ],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
