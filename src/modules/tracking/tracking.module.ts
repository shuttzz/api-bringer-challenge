import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrackingController } from './controllers/tracking.controller';
import { TrackingService } from './services/tacking.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
