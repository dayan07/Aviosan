import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavController, ViewController, NavParams, LoadingController, ModalController} from 'ionic-angular';

import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {SignUpPage} from "../../modals/sign-up/sign-up";
import {AuthService} from "../../services/auth.service";
import {NotifierService} from "../../services/notifier.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userCredentials = {
    email: '',
    password: ''
  };
  public currentPassword = 'password';
  public showPass = false;

  constructor( private authService: AuthService,
              private viewCtrl:ViewController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private ga: GoogleAnalytics,
               private notifierService: NotifierService,) {

  };

  ionViewWillEnter() {
    // if (this.ga) {
    //   this.ga.trackView('Login Page');
    // }
    // this.viewCtrl.showBackButton(false);
  }

  onSubmit(form: NgForm) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.signIn(form.value.email, form.value.password)
      .then((value) => {
          this.viewCtrl.dismiss();
          loading.dismiss();
    })
    .catch(err => {
      loading.dismiss();
      this.notifierService.onError(err);
    });
  }

  goToForgotPassword() {
    // if (this.ga) {
    //   this.ga.trackEvent('Forgot Password Page', 'Redirection from the Login Page');
    // }
    // this.inAppBrowserService.openSite('https://dg.coupons.com/forgotpassword/');
  }

  goToSignUp() {
    let modal = this.modalCtrl.create(SignUpPage);
    modal.onDidDismiss((data)=>{
      if (data && data.authorizationCompleted) {
        this.viewCtrl.dismiss();
      }

    });
    modal.present();

  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.currentPassword = 'text';
    } else {
      this.currentPassword = 'password';
    }
  }
}

