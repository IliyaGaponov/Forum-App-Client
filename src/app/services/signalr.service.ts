import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { ApiPaths, environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private hubUrl = `${environment.hubUrl}`;
  public newPost$: BehaviorSubject<Post | null> = new BehaviorSubject<Post | null>(null);
  public newComment$: BehaviorSubject<Comment | null> = new BehaviorSubject<Comment | null>(null);

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.hubUrl}${ApiPaths.SignalRForumHub}`, {
      })
      .withAutomaticReconnect()
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Started'))
      .catch((err) => console.log('Error while starting SignalR connection: ', err));

    this.hubConnection.on('ReceivePost', (post: Post) => {
      this.newPost$.next(post);
    });

    this.hubConnection.on('ReceiveComment', (comment: Comment) => {
      this.newComment$.next(comment);
    });
  }

  public stopConnection(): void {
    this.hubConnection.stop().then(() => console.log('SignalR connection stopped.'));
  }

  public sendPost(post: Post): void {
    this.hubConnection.invoke('SendPost', post).catch((err) => console.error(err));
  }

  public sendComment(comment: Comment): void {
    this.hubConnection.invoke('SendComment', comment).catch((err) => console.error(err));
  }
}