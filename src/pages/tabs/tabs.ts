import { Component } from '@angular/core';
import { MyTicketsPage } from '../my_tickets/my_tickets';
import { HomePage } from '../home/home';
import { CallTaxi } from "../call_taxi/call_taxi";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyTicketsPage;
  tab3Root = CallTaxi;

  constructor() {

  }
}
