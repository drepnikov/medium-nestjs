import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserEntity } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'src/environment/config';
import { UserResponseInterface } from 'src/user/types/user-response.interface';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();

    Object.assign(newUser, createUserDto);

    return this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    /* Перечисляю все поля, потому-что поле password защищен при выборе сущности, и чтобы его взять, придется перечислить все поля вместе с ним
       Так как поле пароля нужно только в этом методе, и нигде больше, то это оправдано */
    const userByEmail = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      {
        select: ['id', 'email', 'username', 'bio', 'image', 'password'],
      },
    );

    if (!userByEmail) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      userByEmail.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete userByEmail.password;

    return userByEmail;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);

    const fieldsForUpdate = ['email', 'username', 'password', 'image', 'bio'];

    for (const field of fieldsForUpdate) {
      if (updateUserDto[field]) {
        if (field === 'email' && updateUserDto.email !== user.email) {
          const userByEmail = await this.userRepository.findOne({
            email: updateUserDto.email,
          });

          if (userByEmail)
            throw new HttpException(
              'Email is taken',
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        if (field === 'username' && updateUserDto.username !== user.username) {
          const userByUsername = await this.userRepository.findOne({
            username: updateUserDto.username,
          });

          if (userByUsername)
            throw new HttpException(
              'username is taken',
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        user[field] = updateUserDto[field];
      }
    }

    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      id,
    });
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  generateJwt(user: UserEntity) {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }
}
