import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredPostArray!: Array<object>;
  latestPostArray!: Array<object>;
  constructor(private postService: PostService) {
    this.postService.loadFeatured().subscribe((val) => {
      this.featuredPostArray = val;
      console.log(this.featuredPostArray);
    });
  }
  ngOnInit(): void {
    this.postService.loadLatest().subscribe((val) => {
      this.latestPostArray = val;
    });
    console.log(this.latestPostArray);
  }
}
