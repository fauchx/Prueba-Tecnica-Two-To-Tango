import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: any) {
    if (err || !user) {
      console.log('Error de autenticación:', err); 
      console.log('Info de autenticación:', info); 
      throw err || new UnauthorizedException();
    }
    console.log('Usuario autenticado:', user); 
    return user;
  }
}
