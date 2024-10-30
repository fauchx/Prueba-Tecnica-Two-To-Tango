import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from 'src/task/task.entity';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    username: string;
    @Column()
    password: string;
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}