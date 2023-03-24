import { Controller, Get, Query } from '@nestjs/common';
import { TrackingService } from '../services/tacking.service';
import { TrackingParamDTO } from '../dto/tracking-param.dto';
import { TrackingEventsResponse } from '../types/tracking.type';
import { Observable } from 'rxjs';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('events')
  async getTrackingEvents(
    @Query() trackingParamDTO: TrackingParamDTO,
  ): Promise<Observable<TrackingEventsResponse>> {
    return this.trackingService.getTrackingEvents(
      trackingParamDTO.trackingNumber,
    );
  }
}
