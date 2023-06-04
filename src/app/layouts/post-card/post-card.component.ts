import { CommentFormComponent } from './../../comments/comment-form/comment-form.component';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() postData: any;
  postLink!: string;
  postCategory!: string;
  views!: string;
  excerpt!: string;
  updatedAt!: any;
  title!: string;
  id!: string;
  isFeatured!: boolean;
  content!: string;

  constructor() {}

  ngOnInit() {
    const post = this.postData;
    if (this.postData && this.postData.data && this.postData.data.postImgPath) {
      this.postLink = this.postData.data.postImgPath;
      this.postCategory = this.postData.data.category.category;
      this.views = this.postData.data.views;
      this.excerpt = this.postData.data.excerpt;
      this.content = this.postData.data.content;
      this.updatedAt = this.postData.data.createdAt.seconds * 1000;
      this.title = this.postData.data.title;
      this.id = this.postData.id;
      this.isFeatured = this.postData.data.isFeatured;
    }
  }
}
