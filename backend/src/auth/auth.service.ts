// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity'; // Asegúrate de que User tenga solo las propiedades necesarias
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyecta el repositorio de User
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar el nuevo usuario en la base de datos
    const user = new User();
    user.username = username; // Asegúrate de que 'username' sea una propiedad de User
    user.password = hashedPassword; // Asegúrate de que 'password' sea una propiedad de User

    await this.userRepository.save(user); // Guarda el usuario en la base de datos
  }

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    // Buscar el usuario en tu base de datos
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  private async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } }); // Busca el usuario por su nombre de usuario
  }
}
