import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './entities/code.entity';

@Module({
  exports: [CodesService],
  providers: [CodesService],
  controllers: [CodesController],
  imports: [TypeOrmModule.forFeature([Code])],
})
export class CodesModule {}