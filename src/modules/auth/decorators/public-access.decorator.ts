import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const PublicAccess = (): CustomDecorator =>
  SetMetadata('isPublicAccess', true);
