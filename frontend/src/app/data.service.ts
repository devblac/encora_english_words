import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://localhost:5000/words';

  constructor(private http:HttpClient) { }

  getData() {
    return this.http.get(this.apiUrl);
  }

  postData(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
