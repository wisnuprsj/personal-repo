import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching: boolean = false;
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient, private postsSvc: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
    this.errorSubscription = this.postsSvc.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData);
    this.postsSvc.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsSvc.fetchPost().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      (error) => {
        this.isFetching = false;
        console.log(error);
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsSvc.deletePosts().subscribe(() => [(this.loadedPosts = [])]);
  }
}
