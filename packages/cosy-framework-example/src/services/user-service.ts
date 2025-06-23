import { Injectable } from '@coffic/cosy-framework'
import { User, CreateUserData, UpdateUserData } from '../types/user'

@Injectable
export class UserService {
    private users: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date('2024-01-01') },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date('2024-01-02') }
    ]

    private nextId = 3

    /**
     * 获取所有用户
     */
    getUsers(): { users: User[]; total: number } {
        return {
            users: this.users,
            total: this.users.length
        }
    }

    /**
     * 根据 ID 获取用户
     */
    getUserById(id: number): { user: User | null } {
        const user = this.users.find(u => u.id === id)
        if (!user) {
            throw new Error('User not found')
        }
        return { user }
    }

    /**
     * 创建用户
     */
    createUser(userData: CreateUserData): { user: User; message: string } {
        // 验证邮箱是否已存在
        if (this.users.some(u => u.email === userData.email)) {
            throw new Error('Email already exists')
        }

        const user: User = {
            id: this.nextId++,
            name: userData.name,
            email: userData.email,
            createdAt: new Date()
        }

        this.users.push(user)

        return {
            user,
            message: 'User created successfully'
        }
    }

    /**
     * 更新用户
     */
    updateUser(id: number, userData: UpdateUserData): { user: User; message: string } {
        const userIndex = this.users.findIndex(u => u.id === id)
        if (userIndex === -1) {
            throw new Error('User not found')
        }

        // 检查邮箱是否被其他用户使用
        if (userData.email && this.users.some(u => u.id !== id && u.email === userData.email)) {
            throw new Error('Email already exists')
        }

        const user = this.users[userIndex]
        this.users[userIndex] = {
            ...user,
            ...userData,
            id: user.id, // 保持 ID 不变
            createdAt: user.createdAt // 保持创建时间不变
        }

        return {
            user: this.users[userIndex],
            message: 'User updated successfully'
        }
    }

    /**
     * 删除用户
     */
    deleteUser(id: number): { message: string } {
        const userIndex = this.users.findIndex(u => u.id === id)
        if (userIndex === -1) {
            throw new Error('User not found')
        }

        this.users.splice(userIndex, 1)

        return {
            message: 'User deleted successfully'
        }
    }

    /**
     * 根据邮箱获取用户（用于认证）
     */
    getUserByEmail(email: string): User | null {
        return this.users.find(u => u.email === email) || null
    }
} 
