import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {} 
    
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SEED,
      });
      const user = await this.userService.findUserById(payload.id)
      if(!user){
        throw new UnauthorizedException('No se ha encontrado al usuario')
      }
      if(!user.isActive){
        throw new UnauthorizedException('Usuario invactivo')
      }
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
