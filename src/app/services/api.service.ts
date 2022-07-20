import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addBlog(data: any){
    return this.http.post<any>("http://localhost:3000/bloggingForm/", data);
  }

  getBlog(){
    return this.http.get<any>("http://localhost:3000/bloggingForm/");
  }

  putBlog(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/bloggingForm/"+id, data);
  }

  deleteBlog(id: number) {
    return this.http.delete<any>("http://localhost:3000/bloggingForm/"+id);
  }
}
