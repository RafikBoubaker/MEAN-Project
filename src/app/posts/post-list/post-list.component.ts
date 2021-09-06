import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit , OnDestroy {

  //  @Input()  posts: Post[] = [
  posts: Post[] = [
    // { title: "hello A", content: "This is the first elem"},
    // { title: 'hello B', content: 'This is the second elem' },
    // { title: 'hello C', content: 'This is the third elem' }
 ]
  private postSub : Subscription
  

  
  
  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = this.postsService.getPosts()
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[]) => {
      this.posts=posts;
    })
  }

  ngOnDestroy(): void {
  this.postSub.unsubscribe()
}
  
}
