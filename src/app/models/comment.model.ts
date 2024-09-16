export interface Comment {
    postId: number;
    content: string;
    email: string | null;
    userName: string | null;
    createdAt: Date;
}