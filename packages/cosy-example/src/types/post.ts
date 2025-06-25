export interface Post {
    id: number
    title: string
    content: string
    authorId: number
    createdAt: Date
}

export interface CreatePostData {
    title: string
    content: string
} 
