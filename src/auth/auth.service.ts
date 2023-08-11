import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/RegisterDto';
import { AuthResDto } from './dto/AuthDto';
import { User } from './user.entity';
import { LoginDto } from './dto/LoginDto';
import * as crypto from 'crypto';
import { validateEmail, validatePassword } from 'src/validation/auth';

function sha256(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResDto> {
    const { id, username, email, password } = registerDto;

    const user = await this.userRepository.findOneBy({ id, email, username });

    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    if (!validateEmail(email))
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);

    if (!validatePassword(password))
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const accessToken = await this.jwtService.signAsync(
      { id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );

    const newUser = this.userRepository.create({
      id,
      username,
      email,
      password: sha256(password),
      accessToken,
    });
    await this.userRepository.save(newUser);

    return { accessToken };
  }

  async login(loginDto: LoginDto): Promise<AuthResDto> {
    const { id, password } = loginDto;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException('Invalid User', HttpStatus.BAD_REQUEST);

    if (sha256(password) !== user.password)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    const accessToken = await this.jwtService.signAsync(
      { id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );

    await this.userRepository.update(user.id, { accessToken });

    return { accessToken };
  }
}
