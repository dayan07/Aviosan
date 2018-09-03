import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { CustomHttpService } from "../../services/custom-http.service";
import { TicketService } from "../../services/ticket.service";
import { Ticket } from "../../entities/ticket";
import {AuthService} from "../../services/auth.service";
import {HeaderComponent} from "../../components/header/header";

@Component({
  selector: 'my_tickets',
  templateUrl: 'my_tickets.html'
})
export class MyTicketsPage {
  myTickets: Ticket[];
  isAuth: boolean = false;
  @ViewChild('header') header:HeaderComponent;


  constructor(public navCtrl: NavController,
              private customHttpService: CustomHttpService,
              private authService: AuthService,
              private ticketService: TicketService) {
    this.authService.getAuthBehaviorSubject()
      .subscribe((isAuth) => {
        this.isAuth = isAuth;
        this.getMyTickets();
      })

  }
  ionViewWillEnter(){
    if(!this.isAuth) {
      this.header.goToSignInPage();
    }
    else{
      this.getMyTickets();

    }
  }


  getMyTickets(){
    this.ticketService.getTickets()
      .then((res)=>{
        this.myTickets = [];
        let tempTicket;
        res.forEach(ticket=>{
          tempTicket = new Ticket(ticket.id, ticket.cost,ticket.seat.levelClass, ticket.seat.row, ticket.seat.number,ticket.flight.name, ticket.flight.date);
          this.myTickets.push(tempTicket);
        })
      })
      .catch(()=>{

        console.log("Please try again later");
      })






  }







}
