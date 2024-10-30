import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Task } from './task/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';  
import { TasksModule } from './task/task.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Task],
      synchronize: true,
    }),
    AuthModule,  
    TasksModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
