import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Asegúrate de que la ruta es correcta

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(@Request() req): Promise<Task[]> {
    const user = req.user; // Asegúrate de que estás obteniendo el usuario autenticado
    return this.tasksService.getTasks(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const user = req.user; // Asegúrate de que estás obteniendo el usuario autenticado
    return this.tasksService.createTask(createTaskDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTaskById(@Param('id') id: number, @Request() req): Promise<Task> {
    const user = req.user; // Asegúrate de que estás obteniendo el usuario autenticado
    return this.tasksService.getTaskById(id, user);
  }
}
