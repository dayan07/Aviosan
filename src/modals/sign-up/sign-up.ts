import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavController, ViewController, NavParams, LoadingController} from 'ionic-angular';

import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {UserInfo} from "../../entities/userInfo";
import {NotifierService} from "../../services/notifier.service";
import {AuthService} from "../../services/auth.service";
import {Client} from "../../entities/client";
import {UtilsService} from "../../services/utils.service";


@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  myUser: Client;
  password:string;
  confirmPassword:string;
  today: string;

  replacePhoneNumber: string;

  public currentPassword = 'password';
  public showPass = false;

  constructor(private viewCtrl:ViewController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private notifierService: NotifierService,
              private authService: AuthService,
              private utilsService: UtilsService) {
    this.myUser = new Client(null, null, null, null, null, null, null, null, null);

  };

  ionViewWillEnter() {
    let today = new Date();
    this.today = this.utilsService.dateConverter(today);

  }

  onSubmit(form: NgForm) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.replacePhoneNumber = form.value.phoneNumber.replace(/[^0-9]/g, '');



    try {
      if (form.value.firstName == '') {
        throw 'Please enter a valid name.';
      }
      if (form.value.lastName == '') {
        throw 'Please enter a valid last name.';
      }
      //TODO email a@gmail-valid
      if (form.value.email == '' && form.controls.email.errors) {
        throw 'Please enter a valid email.';
      }
      form.value.phoneNumber = this.replacePhoneNumber;

      if (form.value.phoneNumber == '' && this.replacePhoneNumber.length < 12) {
        throw 'Please enter a full valid phone number.';
      }
      if (form.value.password != form.value.confirmPassword) {
        throw 'Passwords do not match. Please try again.';
      }


      if (form.controls.password.errors && form.controls.password.errors.minlength ||
        form.controls.confirmPassword.errors && form.controls.confirmPassword.errors.minlength) {
        throw 'Password should be minimum 8 characters';
      }

      if (form.controls.password.errors && form.controls.password.errors.maxlength ||
        form.controls.confirmPassword.errors && form.controls.confirmPassword.errors.maxlength) {
        throw 'Password should not exceed 255 characters';
      }

      if (form.controls.password.errors) {
        throw 'Password should contain all of these [Upperalpha, loweralpha, numeric], length min-8, max-255';
      }

      this.myUser.phoneNumber = this.replacePhoneNumber;
      let promise = this.signUp;

      promise.bind(this)().then(() => {
        loading.dismiss();
      }).catch((err) => {
        this.notifierService.onError(err);
        loading.dismiss();
      })

    } catch (errMessage) {
        loading.dismiss();
        this.presentInformationToast(errMessage);
    }
  }


  signUp(): Promise<any> {
    return this.authService.registration(this.myUser.email,this.password, this.myUser)
      .then(value => {
        this.presentInformationToast('User has been created successfully.');
        this.viewCtrl.dismiss({authorizationCompleted: true});

      })
  }

  presentInformationToast(message: string) {
    this.notifierService.presentToast(message, 1500, 'top');
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


