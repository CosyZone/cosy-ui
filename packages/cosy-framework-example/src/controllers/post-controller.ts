import { Controller, Get, Post as PostRoute, UseMiddleware, Inject } from '@coffic/cosy-framework'
import { PostService } from '../services/post-service'
import { AuthMiddleware } from '../middleware/auth-middleware'

@Controller('/api/v1/posts')
@UseMiddleware(AuthMiddleware)
export class PostController {
    constructor(@Inject('PostService') private postService: PostService) { }

    @Get('/')
    async index() {
        return this.postService.getPosts()
    }

    @PostRoute('/')
    async create(context: any) {
        const postData = context.request.body
        const userId = context.user?.id
        return this.postService.createPost(postData, userId)
    }
} 
