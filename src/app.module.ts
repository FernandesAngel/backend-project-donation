import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProjectsModule,
    DonationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
