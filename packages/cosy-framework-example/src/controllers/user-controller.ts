import { Controller, Get, Post, Put, Delete, Inject } from '@coffic/cosy-framework'
import { UserService } from '../services/user-service'

@Controller('/api/v1/users')
export class UserController {
    constructor(@Inject('UserService') private userService: UserService) { }

    @Get('/')
    async index() {
        return this.userService.getUsers()
    }

    @Get('/{id}')
    async show(context: any) {
        const id = parseInt(context.request.params.id)
        return this.userService.getUserById(id)
    }

    @Post('/')
    async create(context: any) {
        const userData = context.request.body
        return this.userService.createUser(userData)
    }

    @Put('/{id}')
    async update(context: any) {
        const id = parseInt(context.request.params.id)
        const userData = context.request.body
        return this.userService.updateUser(id, userData)
    }

    @Delete('/{id}')
    async destroy(context: any) {
        const id = parseInt(context.request.params.id)
        return this.userService.deleteUser(id)
    }
} 
