import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../services/signalr.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, PostComponent, CommonModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit {
  posts: Post[] = [];
  postForm!: FormGroup;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.signalRService.startConnection();
    this.signalRService.newPost$.subscribe((post) => {
      if (post) {
        this.posts.push(post);
      }
    });

    this.signalRService.newComment$.subscribe((comment) => {
      if (comment) {
        const post = this.posts.find(p => p.id === comment.postId);
        if (post) {
          post.comments.push(comment);
        }
      }
    });

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  
  loadPosts() {
    this.postService.getPosts()
    .subscribe((response) => {
      this.posts = response.posts;
    });
  }

  createPost() {
    if (this.postForm.valid) {
      let newPost: Post = {
        id: null,
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        createdAt: new Date(),
        email: sessionStorage.getItem('email')!,
        userName: sessionStorage.getItem('userName')!,
        comments: []
      }

      this.postService.createPost(newPost).pipe(
        tap((createdPost: Post) => {          
          this.signalRService.sendPost(createdPost); // Notify SignalR
        })
      )
      .subscribe(
        () => {
          this.postForm.reset();
        }
      );
    }
  }
}
