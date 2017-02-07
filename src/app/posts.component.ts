import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';

import { Post }        from './post';
import { PostService } from './post.service';

@Component({
  moduleId: module.id,
  selector: 'my-posts',
  templateUrl: './posts.component.html',
  styleUrls: [ './posts.component.css' ]
})

export class PostsComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;

  constructor(
    private router: Router,
    private postService: PostService) { }

  getPosts(): void {
    this.postService
        .getPosts()
        .then(posts => this.posts = posts);
  }

  add(title: string, body: string): void {
    title = title.trim();
    body = body.trim();
    if (!title || !body) { return; }
    this.postService.create(title, body)
      .then(post => {
        this.posts.push(post);
        this.selectedPost = null;
      });
  }

  delete(post: Post): void {
    this.postService
      .delete(post.id)
      .then(() => {
        this.posts = this.posts.filter(h => h !== post);
        if (this.selectedPost === post) { this.selectedPost = null; }
      });
  }

  ngOnInit(): void {
    this.getPosts();
  }

  onSelect(post: Post): void {
    this.selectedPost = post;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedPost.id]);
  }
}
