import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../../models/post.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { QuillModule } from 'ngx-quill';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { Comment } from './../../../models/comment.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, QuillModule, CommentComponent, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  commentForm!: FormGroup;

  isShowComments: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }  

  submitComment() {
    if (this.commentForm.valid) {
      let newComment: Comment = {
        postId: this.post.id!,
        content: this.commentForm.value.content,
        email: sessionStorage.getItem('email'),
        userName: sessionStorage.getItem('userName'),
        createdAt: new Date()
      }
      this.commentService.createComment(newComment)
      .subscribe(() => this.commentForm.reset());
    }
  }

  toogleShowComments() {
    this.isShowComments = !this.isShowComments;
  } 
}
