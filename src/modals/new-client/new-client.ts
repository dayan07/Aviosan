import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavController, ViewController, NavParams, LoadingController} from 'ionic-angular';

import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {UserInfo} from "../../entities/userInfo";
import {Client} from "../../entities/client";
import {NotifierService} from "../../services/notifier.service";


@Component({
  selector: 'page-new-client',
  templateUrl: 'new-client.html',
})
export class NewClientPage {
  client: Client;
  replacePhoneNumber: string;
  seatList: any[]=[];

  constructor(private viewCtrl:ViewController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private notifierService: NotifierService,
              private ga: GoogleAnalytics) {
      this.seatList=navParams.get('seatList');
      this.client = new Client(null, null, null, null, null, null, null, null, null);
  }

  ionViewWillEnter() {

  }

  onSubmit(form: NgForm) {
    // let loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();
    console.log(this.client);

    this.replacePhoneNumber = this.client.phoneNumber.replace(/[^0-9]/g, '');

    try {
      if (this.client.firstName == '') {
        throw 'Please enter a valid name.';
      }
      if (this.client.lastName == '') {
        throw 'Please enter a valid last name.';
      }
      if (this.client.email == '' ) {
        throw 'Please enter a valid email.';
      }
      this.client.phoneNumber = this.replacePhoneNumber;

      if (this.client.phoneNumber == '' && this.replacePhoneNumber.length < 12) {
        throw 'Please enter a full valid phone number.';
      }
      this.client.phoneNumber = this.replacePhoneNumber;
      this.viewCtrl.dismiss({userCreated: true, client: this.client});
       // loading.dismiss();
    } catch (errMessage) {
     // loading.dismiss();
      this.notifierService.presentToast(errMessage, 1500, 'top');
    }

  }



}



