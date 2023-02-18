import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>
    ) {}
  
    getAllUsers() {
      return this.userRepository.find();
    }

    getUser(name) {
      return this.userRepository.findOneBy({username: name});
    }
  
    createUser(body) {
      const newUser = this.userRepository.create(body);
      return this.userRepository.save(newUser);
    }
  
    updateUser(id: number, body) {
      return this.userRepository.update({ id }, {
        id: body.id,
        username: body.username
      } );
    }
  
    deleteUser(id: number) {
      return this.userRepository.delete({ id });
    }

    addRole(id: number, body) {
      return this.userRepository.update({ id }, body )
  }
}