import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnDestroy {
  
  private authListnerSubs: Subscription
  userIsAuthenticated=false

  constructor(private authService: AuthService) { }
  


  ngOnInit() {
    this.authListnerSubs = this.authService.getAuthSatusListner().subscribe(isAuthenticated => {
      this.userIsAuthenticated=isAuthenticated;
    })
  }



  ngOnDestroy() {
    this.authListnerSubs.unsubscribe()
    
  }

}
