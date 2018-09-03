import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'orderPopoverPage',
  templateUrl: 'orderPopoverPage.html',
})
export class OrderPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, private ga: GoogleAnalytics) {

  }
  bookingTicket(ticketForBooked){

  }
  close() {
    this.viewCtrl.dismiss();
  }
}


