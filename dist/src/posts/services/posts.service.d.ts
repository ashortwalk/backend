import { CreatePostDto } from '../dto/create-post.dto';
import { PostRepository } from '../repositories/posts.repository';
import { AzureBlobService } from './azure-blob.service';
import { ResizeImagePipe } from './resize.service';
import { UpdatePostDto } from '../dto/update-post.dto';
export declare class PostService {
    private readonly postRepository;
    private readonly resizeImagePipe;
    private readonly azureBlobService;
    constructor(postRepository: PostRepository, resizeImagePipe: ResizeImagePipe, azureBlobService: AzureBlobService);
    createPost(userId: string, nickname: string, file: Express.Multer.File, createPostDto: CreatePostDto): Promise<import("../entities").PostEntity>;
    findPost(postId: string): Promise<import("../entities").PostEntity>;
    findPosts(page: number): Promise<import("../entities").PostEntity[]>;
    updatePost(userId: string, postId: string, updatePostDto: UpdatePostDto, file: Express.Multer.File): Promise<import("../entities").PostEntity>;
    deletePost(userId: string, role: string, id: string): Promise<boolean>;
    statisticsByCategory(userId: string): Promise<any[]>;
    countTotalPages(): Promise<number>;
}
