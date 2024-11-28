import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../services/posts.service';
import { UpdatePostDto } from '../dto/update-post.dto';
import { TokenPayload } from 'src/user/types/user.type';
import { PostEntity } from '../entities';
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostService);
    countTotalPages(): Promise<{
        count: number;
    }>;
    createPost(req: {
        user: TokenPayload;
    }, file: Express.Multer.File, createPostDto: CreatePostDto): Promise<PostEntity>;
    getPost(param: {
        postId: string;
    }): Promise<PostEntity>;
    getPosts(query: {
        page: number;
    }): Promise<PostEntity[]>;
    updatePost(req: {
        user: TokenPayload;
    }, param: {
        postId: string;
    }, updatePostDto: UpdatePostDto, file: Express.Multer.File): Promise<PostEntity>;
    deletePost(req: any, param: {
        postId: string;
    }): Promise<boolean>;
}
