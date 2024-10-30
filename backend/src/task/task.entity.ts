import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';
export enum TaskStatus{
    PENDING = 'pendiente',
    IN_PROGRESS = 'en progreso',
    COMPLETED = 'completada'
}
@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title:string;
    @Column()
    description:string;
    @Column({type:'text'})
    status: TaskStatus;
    @Column({type:'date'})
    dueDate: Date;
    @ManyToOne(()=> User, (user)=> user.tasks, {eager:false})
    user: User;
}