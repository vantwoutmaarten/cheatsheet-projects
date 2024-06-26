import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@availableParallelism.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Juliane.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettiner@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArr = this.users.filter((user) => user.role === role);
      if (rolesArr.length === 0) throw new NotFoundException('Role not found');
      return rolesArr;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const userByHighestId = this.users.reduce((prev: number, current) => {
      return prev > current.id ? prev : current.id;
    }, 0);
    const id = userByHighestId + 1;
    const newUser = { id, ...createUserDTO };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDTO: UpdateUserDTO) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = { ...this.users[index], ...updateUserDTO };
    return this.findOne(id);
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    this.users = this.users.filter((user) => user.id !== id);
    return user;
  }
}
