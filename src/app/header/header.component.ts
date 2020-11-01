import {Component, OnDestroy, OnInit} from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../auth/shared/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  subscriptionLogged: Subscription
  subscriptionUsername: Subscription

  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.subscriptionLogged = this.authService.getLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    })
    this.subscriptionUsername = this.authService.getUsernameObservable().subscribe((username: string) => {
      this.username = username;
    })
  }

  ngOnDestroy(): void {
    this.subscriptionLogged.unsubscribe();
    this.subscriptionUsername.unsubscribe();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('').then(() => {
      window.location.reload();
    })
  }
}
