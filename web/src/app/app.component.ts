import { Component, OnInit } from '@angular/core';
import { Article } from 'src/models/article';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private appService: AppService,
  ){}
  ngOnInit(): void {
    this.getArticles();
  }
  articles : Article[] = [];



  async getArticles(): Promise<void> {
    this.articles = await this.appService.getArticles();
  }
}
