import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from "src/app/auth/auth.service";
import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit , OnDestroy {

  //  @Input()  posts: Post[] = [
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;
  authStatusSubs: Subscription
  userIsAuthenticated = false
  userId: string
  

  constructor(public postsService: PostsService , private authService: AuthService) { }

  ngOnInit() {
   this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId()
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    
    this.userIsAuthenticated=this.authService.getIsAuth()
    this.authStatusSubs = this.authService.getAuthSatusListner().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId()
    })
  }


  
  
  onDelete(postId: string) {
   this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  changePage(pageData: PageEvent) {
    console.log(pageData)
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  

    ngOnDestroy(): void {
      this.postsSub.unsubscribe()
      this.authStatusSubs.unsubscribe()
}
}
