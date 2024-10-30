import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Obtener todas las tareas del usuario
  async getTasks(user: User): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user } });
  }

  // Obtener una tarea por ID
  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return task;
  }

  // Crear una nueva tarea
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, dueDate } = createTaskDto; // Desestructurar el DTO
    const task = this.tasksRepository.create({
      title,
      description,
      dueDate,
      status: TaskStatus.PENDING,
      user,
    });
    return await this.tasksRepository.save(task);
  }

  // Actualizar una tarea existente
  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user); // Llama a getTaskById para verificar la existencia de la tarea
    task.status = status; // Actualiza el estado
    return await this.tasksRepository.save(task); // Guarda los cambios
  }

  // Eliminar una tarea
  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
  }
}
