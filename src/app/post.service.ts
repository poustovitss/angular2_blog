import { Injectable }     from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Post } from './post';

@Injectable()
export class PostService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private _postsUrl = 'http://localhost:4000/api/posts';

  constructor(private http: Http) {  }

  getPosts(): Promise <Post[]> {
    return this.http.get(this._postsUrl)
                    .toPromise()
                    .then(response => response.json().data as Post[])
                    .catch(this.handleError);
  }

  getPost(id: number): Promise<Post> {
    const url = `${this._postsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Post)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(title: string, body: string): Promise<Post> {
    return this.http
      .post(this._postsUrl, JSON.stringify({title: title, body: body}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(post: Post): Promise<Post> {
    const url = `${this._postsUrl}/${post.id}`;
    return this.http
      .patch(url, JSON.stringify(post), {headers: this.headers})
      .toPromise()
      .then(() => post)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
