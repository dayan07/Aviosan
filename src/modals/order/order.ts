import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NavController, ViewController, NavParams, LoadingController, ModalController} from 'ionic-angular';

import {Ticket} from "../../entities/ticket";
import {Flight} from "../../entities/flight";
import {Client} from "../../entities/client";
import {NewClientPage} from "../new-client/new-client";
import {AuthService} from "../../services/auth.service";
import {SignUpPage} from "../sign-up/sign-up";
import {TicketService} from "../../services/ticket.service";
import {TicketREST} from "../../entities/ticketREST";


@Component({
  selector: 'order',
  templateUrl: 'order.html',
})
export class OrderPage {

  tickets:TicketREST[]=[];
  myTicket: Ticket;
  flight: Flight;
  seatList: any[];
  cost: number = 50;
  globalCost: number;
  selectedClients: Client[]=[];
  clientList: Client[]=[];


  constructor(private authService: AuthService,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              private viewCtrl:ViewController,
              private modalCtrl: ModalController,
              public navParams: NavParams,
              private ticketService: TicketService) {
    this.flight = navParams.get('flight');
    this.myTicket = new Ticket(null, null, null, null, null, this.flight.name, this.flight.date);
    this.seatList = this.flight.seatList;

  };

  ionViewWillEnter() {
    return this.authService.getClients()
      .then(value => {

        this.clientList = value;
    })
  }

  onSubmit(form: NgForm) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.selectedClients.forEach((client) => {
      let ticket = new TicketREST(this.cost, client.selectedSeatId, this.flight.id, client);
      this.tickets.push(ticket);
    });
    this.ticketService.saveTickets(this.tickets)
      .then((value) => {
            if (value.isSuccess) {
              loading.dismiss();
              this.viewCtrl.dismiss({created: true});
            }
        //     else if (value.errorCode = "4315" && !form.controls.password.errors) {
        //       this.notifierService.presentToast("Email or password is incorrect", 1500, 'top');
        //     }
        //     else if (form.controls.password.errors.minlength || form.controls.password.errors.maxlength) {
        //       this.notifierService.presentToast('Password must be between 8 and 255 characters long', 1500, 'top');
        //     }
        //     else if (value.errorCode != "") {
        //       this.notifierService.presentToast(value.errorDescription, 1500, 'top');
        //     }
        //
        //     loading.dismiss();

        // })
        // .catch(err => {
        //
        //   this.notifierService.onError(err);
        // });


      })
  }


  addClient(){
    let modal = this.modalCtrl.create(NewClientPage, {seatList:this.seatList});
    modal.onDidDismiss((data)=>{
      if (data && data.userCreated) {
        this.clientList.push(data.client);
        this.selectedClients.push(data.client);
      }
    });
    modal.present();


  }




}



