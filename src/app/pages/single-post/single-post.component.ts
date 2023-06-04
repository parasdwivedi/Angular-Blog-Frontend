import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData!: any;
  postLink!: string;
  postCategory!: string;
  views!: string;
  excerpt!: string;
  updatedAt!: any;
  isFeatured!: boolean;
  title!: string;
  id!: string;
  content!: string;
  postArray!: Array<object>;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log(val['id']);
      console.log(val['category']);
      this.postService.loadOnePost(val['id']).subscribe((post) => {
        this.postData = post;
        this.postLink = this.postData['postImgPath'];
        this.postCategory = this.postData['category']['category'];
        this.views = this.postData['views'];
        this.excerpt = this.postData['excerpt'];
        this.updatedAt = this.postData['createdAt']['seconds'] * 1000;
        this.title = this.postData['title'];
        this.content = this.postData['content'];
        this.isFeatured = this.postData['isFeatured'];
      });
      this.loadSimilarPost(val['category']);
      this.postService.countViews(val['id']);
    });
  }
  loadSimilarPost(catId: string) {
    this.route.params.subscribe((val) => {
      this.postService.loadSimilar(catId).subscribe((val) => {
        this.postArray = val;
      });
    });
  }
}
