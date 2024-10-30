import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [],
  controllers: [],
})
export class TasksModule {}
