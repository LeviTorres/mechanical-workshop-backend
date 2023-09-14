import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('No existe usuario');
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Contrasena incorrecta');
    }

    const { password: _, ...rest } = user.toJSON();
 
    return {
      user: rest,
      token: this.getJwtToken({ id: user._id }),
    };
  } 

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
