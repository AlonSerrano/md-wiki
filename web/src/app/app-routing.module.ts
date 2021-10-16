import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';

const routes: Routes = [
  {
    path: ":name",
    component: ArticleDetailsComponent,
  },
  {
    path: "edit/:name",
    component: ArticleEditComponent,
  },
  {
    path: "add/new",
    component: ArticleEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    ,{
    relativeLinkResolution: "legacy",
    useHash: true,
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
