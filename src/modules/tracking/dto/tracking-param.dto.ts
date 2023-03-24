import { IsNotEmpty } from 'class-validator';

export class TrackingParamDTO {
  @IsNotEmpty({ message: 'Param tracking number is required' })
  trackingNumber: string;
}
