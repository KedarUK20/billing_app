import { Module } from '@nestjs/common';

import { DatabaseModule } from '@app/database';
import { controllers } from './controllers';

@Module({
  imports: [DatabaseModule],
  controllers: [...controllers],
  providers: [],
})
export class AppModule {}