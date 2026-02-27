import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ConflictException('Email already registered')
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    })

    return this.generateToken(user.id, user.email)
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return this.generateToken(user.id, user.email)
  }

  private generateToken(userId: string, email: string) {
    const payload = { sub: userId, email }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}