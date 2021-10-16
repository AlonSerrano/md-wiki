import { Article } from "src/models/article";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
  })
export class AppService {
    constructor(private http: HttpClient) { }
    async getArticles(): Promise<Article[]> {
        try {
            const result = await this.http
                .get<Article[]>(`http://localhost:9090/articles/`)
                .toPromise();
            return result;
        } catch (error:any) {
            Swal.fire({
                title: "Error!",
                text: error.error.Description,
                icon: "error",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            });
            return error;
        }
    }
    async getArticle(name: string): Promise<Article> {
        try {
            const result = await this.http
                .get<Article>(`http://localhost:9090/articles/${name}`)
                .toPromise();
            return result;
        } catch (error:any) {
            Swal.fire({
                title: "Alert",
                text: "No article with this exact name found. Use New button in the header to add it.",
                icon: "warning",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
            error = null;
            return error;
        }
    }
    async putArticle(article:Article): Promise<Article> {
        try {
            const result = await this.http
                .put<Article>(`http://localhost:9090/articles/${article.name}`,article.text)
                .toPromise();
            return result;
        } catch (error:any) {
            Swal.fire({
                title: "Alert",
                text: "No article with this exact name found. Use New button in the header to add it.",
                icon: "warning",
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            });
            error = null;
            return error;
        }
    }
}