import { Injectable } from "@angular/core";
import { ApiPaths, environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";

@Injectable({
    providedIn: 'root',
  })
  export class PostService {
    private apiUrl = `${environment.apiUrl}`;
  
    constructor(private http: HttpClient) {}
  
    getPosts(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}${ApiPaths.GetAllPosts}`);
    }
  
    createPost(post: Post): Observable<any> {
      return this.http.post(`${this.apiUrl}${ApiPaths.CreatePost}`, post);
    }    
  }