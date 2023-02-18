import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(body) {
        const user = await this.validateUser(body)
        return this.generateToken(user)
    }

    async registration(body) {

                const candidate = await this.userService.getUser(body.username);
                if (candidate) {
                    throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST);
                }
                const hashPassword = await bcrypt.hash(body.password, 5);
                const user = await this.userService.createUser({ ...body, password: hashPassword })
                return this.generateToken(user)
            }
 

    private async generateToken(user) {
        const payload = {id: user.id, username: user.username, role: user.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(body) {
        const user = await this.userService.getUser(body.username);
        const passwordEquals = await bcrypt.compare(body.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
}
