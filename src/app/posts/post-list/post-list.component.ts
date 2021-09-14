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
  posts: Post[] = []
  private postSub : Subscription
   isLoading = false

  
  
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.isLoading=true;
    this.postsService.getPosts()
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[]) => {
      this.isLoading=false;
      this.posts = posts;
      
    })
  }

  ngOnDestroy(): void {
  this.postSub.unsubscribe()
}
  
  
  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  
}
