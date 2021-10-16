import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ArticleEditComponent } from './article-edit.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';


describe('ArticleEditComponent', () => {
  let component: ArticleEditComponent;
  let fixture: ComponentFixture<ArticleEditComponent>;
  let mockParams, mockActivatedRoute: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleEditComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ name: null })) }
        },
        {
          provide: AppService,
          useValue: jasmine.createSpyObj('AppService', ['getArticle'])
       }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditComponent);
    component = fixture.componentInstance;
    //mockActivatedRoute.testParams = {name: ''};
    fixture.detectChanges();
  });

  it('Disable when providing a key', () => {
    let isDisabled = component.articleForm.controls['name'].disabled;
    expect(isDisabled).toBeTruthy();
  });
});


import { EventEmitter, Injectable, Output } from "@angular/core";
import { Article } from 'src/models/article';

@Injectable()
export class AppService {
  article: Article = {
    name: "Test",
    text: "Test Hello"
  };

  getArticle(name: string) {
    return this.article;
  }
}