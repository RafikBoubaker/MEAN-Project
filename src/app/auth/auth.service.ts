import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string
  private authStatusListner = new Subject<boolean>()

  constructor(private http: HttpClient) { }
  



createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }


login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token : string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token
        this.token = token;
        this.authStatusListner.next(true)
      })
  }



  getToken() {
    return this.token
  }

  getAuthSatusListner() {
    return this.authStatusListner.asObservable()
  }

}
