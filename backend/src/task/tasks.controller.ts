import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(user: User): Promise<Task[]> {
    return this.tasksService.getTasks(user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number, user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: number, @Body('status') status: TaskStatus, user: User): Promise<Task> {
    return this.tasksService.updateTask(id, status, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number, user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
