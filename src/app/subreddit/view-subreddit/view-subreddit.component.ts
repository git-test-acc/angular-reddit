import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";
import {SubredditModel} from "../subreddit-model";

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.scss']
})
export class ViewSubredditComponent implements OnInit {

  subreddit: SubredditModel
  posts: Array<PostModel> = [];

  ngOnInit(): void {
  }

  constructor(private postService: PostService) {
    this.postService.getAllPostsBySubreddit(this.subreddit.id).subscribe(post => {
      this.posts = post;
    });
  }

}
