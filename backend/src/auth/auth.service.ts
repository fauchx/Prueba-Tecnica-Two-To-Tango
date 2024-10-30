import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const user = this.usersRepository.create({ username, password });
    await this.usersRepository.save(user);
    return user;
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ where: { username, password } });
    
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
