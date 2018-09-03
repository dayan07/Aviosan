import {Component, ViewChild} from '@angular/core';
import {ModalController, NavController, PopoverController, ViewController} from 'ionic-angular';
import { Flight } from "../../entities/flight";
import { CustomHttpService } from "../../services/custom-http.service";
import { FlightsService } from "../../services/flights.service";
import { OrderPopoverPage } from "../../popovers/orderPopoverPage/orderPopoverPage";
import {AuthService} from "../../services/auth.service";
import {OrderPage} from "../../modals/order/order";
import {NotifierService} from "../../services/notifier.service";
import {HeaderComponent} from "../../components/header/header";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  actualFlights: Flight[];
  isAuth: boolean = false;
  @ViewChild('header') header:HeaderComponent;

  constructor(public navCtrl: NavController,
              private notifierService: NotifierService,
              private customHttpService: CustomHttpService,
              private authService: AuthService,
              private flightsService: FlightsService,
              private modalCtrl: ModalController,
              private viewCtrl:ViewController,
              public popoverCtrl: PopoverController) {

    this.authService.getAuthBehaviorSubject()
      .subscribe((isAuth) => {
        this.isAuth = isAuth;
      })
    this.flightsService.getFlightsBehaviorSubject()
      .subscribe((flights) => {
        this.actualFlights = flights;
      })

  }
  ionViewWillEnter(){
    this.getActualFlights();

    this.authService.isAuth()
      .then(isAuth => {
        this.isAuth = isAuth;
      })  }



  getActualFlights(){

    this.flightsService.getFlights()
      .then((res)=>{
        this.actualFlights = [];
        let tempFlight;
        res.forEach(flight=>{
          tempFlight = new Flight(flight.id, flight.name,flight.date, flight.status, flight.availableSeatsCount, flight.route.startPoint, flight.route.endPoint, flight.plane.seatList);
          this.actualFlights.push(tempFlight);
        })
      })
      .catch(()=>{


      })






  }

  addTicket(flight){
    if(!this.isAuth) {
      this.header.goToSignInPage();
    }
    else{
      let modal = this.modalCtrl.create(OrderPage, {flight: flight});
      modal.onDidDismiss((data) => {
        if (data && data.created) {
          this.notifierService.presentToast("Your tickets have been added successfully", 1500, 'top');
        }
        else {
          this.notifierService.presentToast("Ooops something went wrong", 1500, 'top');
        }
        this.getActualFlights();
      });
      modal.present();
    }
  }






}
