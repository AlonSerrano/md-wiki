import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/models/article';
import Swal from 'sweetalert2';
import { AppService } from '../app.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.article = { name: "", text: "" }
    this.articleForm = this.fb.group({
      name: ["", Validators.required],
      text: ["", Validators.required],
    });
  }
  article: Article;
  isNew: boolean = false;
  showPreview: boolean = false;
  articleForm: FormGroup;

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: any) => {
      let name = params.get('name');
      this.isNew = name == null
      if (!this.isNew) {
        this.articleForm.controls['name'].disable();
        this.getArticle(name);
      }
    });

  }

  async getArticle(name: string): Promise<void> {
    let res = await this.appService.getArticle(name);
    if(!res){
      this.router.navigate(["/"]);
    }
    this.article = res;
    this.articleForm.patchValue({
      name: this.article.name,
      text: this.article.text
    });
  }

  async save() {
    if (this.articleForm.invalid) {
      return;
    }
    this.article.name = this.articleForm.get('name')?.value;
    this.article.text = this.articleForm.get('text')?.value;
    let res = await this.appService.putArticle(this.article);
    Swal.fire({
      title: "Success",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    this.router.navigate(["/"]);
    await this.delay(1200);
    if (this.isNew) {
      window.location.reload();
    }
  }
  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }


  preview() {
    this.article.name = this.articleForm.get('name')?.value;
    this.article.text = this.articleForm.get('text')?.value;
    this.showPreview = !this.showPreview;
  }
}
