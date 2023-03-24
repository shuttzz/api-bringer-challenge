import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TrackingEventsResponse } from '../types/tracking.type';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class TrackingService {
  constructor(private http: HttpService, private config: ConfigService) {}

  async getTrackingEvents(
    trackingNumber: string,
  ): Promise<Observable<TrackingEventsResponse>> {
    const BRINGER_TOKEN = this.config.get('BRINGER_TOKEN');

    const configHeader = {
      headers: {
        Authorization: `Bearer ${BRINGER_TOKEN}`,
      },
    };

    return this.http
      .get(
        `https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${trackingNumber}`,
        configHeader,
      )
      .pipe(map((response) => response.data))
      .pipe(
        catchError((err) => {
          throw new InternalServerErrorException(
            err?.response?.data?.message ||
              'Error communicating with the Bringer API',
          );
        }),
      );
  }
}
