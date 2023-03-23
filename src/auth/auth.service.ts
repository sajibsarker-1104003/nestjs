import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException('Email Already Exists');
    }
    const hashedPassword = await this.hashedPassword(password);
    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return {
      message: 'Signup was successfull',
    };
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      throw new BadRequestException('Invalid Credentials!!');
    }
    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.hashedPassword,
    });
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials!!');
    }

    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    return {
      message: 'Signin was successfull',
      token,
    };
  }
  async signout() {
    return {
      message: 'Signout was successfull',
    };
  }

  async getAll() {
    const result = await this.prisma.user.findMany();

    return {
      message: 'get all',
      result: result,
    };
  }

  async hashedPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async comparePassword(args: { password: string; hash: string }) {
    const isMatch = await bcrypt.compare(args.password, args.hash);
    return isMatch;
  }

  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
  //some code here
}
