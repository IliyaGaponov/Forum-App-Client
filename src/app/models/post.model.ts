import { Comment } from './comment.model';

export interface Post {
  id: number | null;
  title: string;
  content: string;
  email: string;
  userName: string;
  createdAt: Date;
  comments: Comment[];
}