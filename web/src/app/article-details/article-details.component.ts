import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/models/article';
import { AppService } from '../app.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
  ) {
    this.article = { name: "", text: "" }
  }
  article: Article;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      let name = params.get('name');
      this.getArticle(name);
    });

  }



  async getArticle(name: string): Promise<void> {
    this.article = await this.appService.getArticle(name);
  }

}
