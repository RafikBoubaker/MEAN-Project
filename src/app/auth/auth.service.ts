import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.model';



const BackendUrl = environment.apiUrl+ "/user/"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: NodeJS.Timer; //or any
  private authStatusListener = new Subject<boolean>()
  private userId: string
  
  constructor(private http: HttpClient,private router: Router) { }
  



createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(BackendUrl+"/signup", authData)
      .subscribe(() => {
       this.router.navigate(['/'])
      }, error => {
        this.authStatusListener.next(false)
      }
      
    );
  }


login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token : string ,expiresIn:number , userId:string }>(BackendUrl+"/login", authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token
        this.token = token;
        if (token) {

          const expiresInDuration = response.expiresIn;
          console.log(expiresInDuration)
          this.setAuthTimer(expiresInDuration)       
          this.isAuthenticated = true;
          
          this.userId = response.userId

          this.authStatusListener.next(true)
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
          console.log(expirationDate)
          this.saveAuthData(token,expirationDate,this.userId)
          this.router.navigate(['/'])
        }
      }, error => {
        this.authStatusListener.next(false)
      })
  }



  getToken() {
    return this.token
  }

  getAuthSatusListner() {
    return this.authStatusListener.asObservable()
  }


  getIsAuth() {
    return this.isAuthenticated
  }


  getUserId() {
  return this.userId
}

  autoAuthUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return;
    }
    const now = new Date()
    const expireIn = authInformation.expirationDate.getTime() - now.getTime()
    if (expireIn > 0) {
      this.token = authInformation.token
      this.isAuthenticated = true
      this.userId = authInformation.userId
      this.setAuthTimer(expireIn / 1000)
      this.authStatusListener.next(true)
    }
}




  logout() {
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.userId = null;
    this.router.navigate(['/'])
  }








   private saveAuthData(token:string, expirationDate:Date, userId:string) {
    localStorage.setItem('token', token)
     localStorage.setItem('expiration', expirationDate.toISOString())
     localStorage.setItem('userId', userId)
   }
  
  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
  }
  
  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    const userId = localStorage.getItem('userId')
    if (!token || !expirationDate) {
      
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  private setAuthTimer(duration: number) {
   this.tokenTimer = setTimeout(() => { this.logout() }, duration * 1000)

}

}
