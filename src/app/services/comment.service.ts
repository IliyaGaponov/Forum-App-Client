import { Injectable } from "@angular/core";
import { ApiPaths, environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from '../models/comment.model';

@Injectable({
    providedIn: 'root',
  })
  export class CommentService {
    private apiUrl = `${environment.apiUrl}`;
  
    constructor(private http: HttpClient) {}
  
    createComment(comment: Comment): Observable<any> {
      return this.http.post(`${this.apiUrl}${ApiPaths.CreateComment}`, comment);
    }
  }