import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavController, ViewController, NavParams, LoadingController, ModalController} from 'ionic-angular';

import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {NotifierService} from "../../services/notifier.service";
import {FlightsService} from "../../services/flights.service";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchParams = {
    startPoint: '',
    endPoint: '',
    startDate: '',
    endDate: ''
  };

  constructor( private flightsService: FlightsService,
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
    this.flightsService.searchFlights(this.searchParams.startPoint, this.searchParams.endPoint, this.searchParams.startDate, this.searchParams.endDate)
      .then((res)=>{
        loading.dismiss();
        this.viewCtrl.dismiss();
      })
      .catch(err => {
        loading.dismiss();
        this.notifierService.onError(err);
      });
  }


}

