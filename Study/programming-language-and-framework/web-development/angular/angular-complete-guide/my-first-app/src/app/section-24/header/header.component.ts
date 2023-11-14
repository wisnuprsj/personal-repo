import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  authSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.authSubscription = this.authService.user.subscribe((user) => {
    this.authSubscription = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isLoggedIn = !!user;
      });
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
