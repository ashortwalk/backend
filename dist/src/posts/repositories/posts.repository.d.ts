import { EntityManager, Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities';
import { UserRepository } from 'src/user/repositories';
import { UpdatePostDto } from '../dto/update-post.dto';
export declare class PostRepository extends Repository<PostEntity> {
    private readonly repo;
    private readonly entityManager;
    private readonly userRepository;
    constructor(repo: Repository<PostEntity>, entityManager: EntityManager, userRepository: UserRepository);
    createPost(userId: string, nickname: string, imgURL: string, thumbnailURL: string, createPostDto: CreatePostDto): Promise<PostEntity>;
    findPostById(postId: string): Promise<PostEntity>;
    findPosts(page: number): Promise<PostEntity[]>;
    updatePostById(postId: string, updatePostDto: UpdatePostDto, imgURL: string, thumbnailURL: string): Promise<PostEntity>;
    deletePostById(postId: string): Promise<boolean>;
    statisticsByCategory(userId: string): Promise<any[]>;
    countTotalPosts(): Promise<number>;
}
