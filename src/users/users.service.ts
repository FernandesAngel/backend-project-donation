import { UpdateUserDto } from './dto/updateUser.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './../auth/auth.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './models/users.model';
import { HelpersFile } from 'src/shared/helpersFile';
import * as mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  public async signup(signupDto: SignupDto): Promise<User> {
    const user = new this.usersModel(signupDto);

    return user.save();
  }
  public async signin(signinDto: SigninDto): Promise<{
    name: string;
    jwtToken: string;
    email: string;
    _id: string;
    avatarUrl: string;
  }> {
    const user = await this.findByEmail(signinDto.email);
    const match = await this.checkPassword(signinDto.password, user);
    if (!match) {
      throw new NotFoundException('Credenciais inválidas');
    }
    const jwtToken = await this.authService.createAccessToken(user._id);
    return {
      name: user.name,
      jwtToken,
      email: user.email,
      _id: user._id,
      avatarUrl: user.avatarUrl,
    };
  }

  public async findAll(): Promise<User[]> {
    return this.usersModel.find();
  }

  private async findByEmail(email: string): Promise<User> {
    const user = this.usersModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email não encontrado.');
    }
    return user;
  }
  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Senha não encontrado.');
    }
    return match;
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  public async updateAvatar(file: string, id: string) {
    const userAvatar = await this.usersModel.findById(id);
    if (userAvatar.avatar) {
      await HelpersFile.removeFile(userAvatar.avatar);
    }
    return this.usersModel.findByIdAndUpdate(
      id,
      { avatar: file },
      { new: true },
    );
  }
}
