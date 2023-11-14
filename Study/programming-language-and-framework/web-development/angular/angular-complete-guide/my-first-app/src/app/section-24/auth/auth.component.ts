import * as fromApp from './../store/app.reducer';
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;
  private hostSubscription: Subscription;
  private storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showError(this.error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.hostSubscription) {
      this.hostSubscription.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }

  onSubmit(form: NgForm) {
    // console.log(`My Environment: ${APP_NAME}`);
    this.error = null;
    if (!form.valid) {
      return;
    }
    // console.log(form.value);
    const { email, password } = form.value;

    // let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      // authObs = this.authService.signup(email, password);
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    // authObs.subscribe(
    //   (resData) => {
    //     this.isLoading = false;
    //     console.log(resData);
    //     this.router.navigate(['./recipes']);
    //   },
    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.isLoading = false;
    //     this.showError(errorMessage);
    //     this.error = errorMessage;
    //   }
    // );

    form.reset();
  }

  onClose() {
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showError(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.hostSubscription = componentRef.instance.close.subscribe(() => {
      this.hostSubscription.unsubscribe();
      hostViewContainerRef.clear();
      this.onClose();
    });
  }
}
