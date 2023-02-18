import {Body, Controller, Get, UseGuards, Put, Delete, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtAdminGuard} from "../auth/jwt-admin";
import {JwtDeveloperGuard} from "../auth/jwt-developer";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @UseGuards(JwtAdminGuard)
    @Put('/:id')
    update(@Param('id') id: number, @Body() body) {
        return this.usersService.updateUser(id, body)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @UseGuards(JwtDeveloperGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
     }

     @UseGuards(JwtDeveloperGuard) 
     @Put('/role/:id')
     addRole(@Param('id') id: number, @Body() body) {
        return this.usersService.addRole(id, body);
    }






}
