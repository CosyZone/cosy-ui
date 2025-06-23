import { Injectable } from '@coffic/cosy-framework'
import { Post, CreatePostData } from '../types/post'

@Injectable
export class PostService {
    private posts: Post[] = [
        {
            id: 1,
            title: 'Welcome to Cosy Framework',
            content: 'This is a sample post using the Cosy Framework.',
            authorId: 1,
            createdAt: new Date('2024-01-01')
        }
    ]

    private nextId = 2

    /**
     * 获取所有文章
     */
    getPosts(): { posts: Post[]; total: number } {
        return {
            posts: this.posts,
            total: this.posts.length
        }
    }

    /**
     * 根据 ID 获取文章
     */
    getPostById(id: number): { post: Post | null } {
        const post = this.posts.find(p => p.id === id)
        if (!post) {
            throw new Error('Post not found')
        }
        return { post }
    }

    /**
     * 创建文章
     */
    createPost(postData: CreatePostData, authorId: number): { post: Post; message: string } {
        const post: Post = {
            id: this.nextId++,
            title: postData.title,
            content: postData.content,
            authorId,
            createdAt: new Date()
        }

        this.posts.push(post)

        return {
            post,
            message: 'Post created successfully'
        }
    }

    /**
     * 获取用户的文章
     */
    getPostsByUserId(userId: number): { posts: Post[]; total: number } {
        const userPosts = this.posts.filter(p => p.authorId === userId)
        return {
            posts: userPosts,
            total: userPosts.length
        }
    }
} 
