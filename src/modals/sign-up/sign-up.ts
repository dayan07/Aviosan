import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavController, ViewController, NavParams, LoadingController} from 'ionic-angular';

import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {UserInfo} from "../../entities/userInfo";
import {NotifierService} from "../../services/notifier.service";
import {AuthService} from "../../services/auth.service";
import {Client} from "../../entities/client";


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
              private authService: AuthService) {
    this.myUser = new Client(null, null, null, null, null, null, null, null, null);

  };

  ionViewWillEnter() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let todayStr;
    let mmStr;
    let ddStr;
    if(dd<10)
    {
      ddStr='0'+dd;
    }

    if(mm<10)
    {
      mmStr='0'+mm;
    }
    todayStr = yyyy+'-'+mm+'-'+dd;
    this.today = todayStr;


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
        // if (value.errorCode === "4346") {
        //   this.presentInformationToast('The phone number you\'ve provided is already registered ' +
        //     'for Dollar General\'s Digital Coupon service');
        //   return;
        // }
        // if (value.errorCode === "5036") {
        //   this.presentInformationToast('That phone number could not be accepted at this time. ' +
        //     'Please use another mobile phone number or contact us for assistance.');
        //   return;
        // }
        //
        // if (value.errorCode === "4348" || value.errorCode !== undefined) {
        //   this.presentInformationToast('Sign up could not be completed. Please try again.');
        //   return;
        // }
        //
        // if (value.information && value.information.message == "Authcode has been sent successfully") {
        //   this.navCtrl.push(PhoneNumberValidation, {
        //     myUser: this.myUser
        //   });
        // }
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


