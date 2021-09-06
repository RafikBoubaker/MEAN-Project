import { Component, OnInit, EventEmitter , Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {


  enteredTitle = ''
  enteredContent=''
 //@Output() postCreated = new EventEmitter<Post>();


  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
  }

  AddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // const newPost:Post = { title: form.value.title, content: form.value.content };
    // this.postCreated.emit(newPost)
    this.postsService.addPost(form.value.title, form.value.content)
    form.resetForm();
  }

}
