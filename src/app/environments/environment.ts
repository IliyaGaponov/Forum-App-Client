export const environment = {
    production: false,
    apiUrl: 'https://localhost:7177/api/',  
    hubUrl: 'https://localhost:7177/',  
  };

export enum ApiPaths {
Register = 'user/register',
Login = 'user/login',
GetAllPosts = 'post/posts',
CreatePost = 'post/createpost',
CreateComment = 'post/createcomment',
SignalRForumHub = 'forumHub',
}