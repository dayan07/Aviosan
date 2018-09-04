import {Injectable} from '@angular/core';
import {CustomHttpService} from './custom-http.service';
import {Environment} from "../environments/environments";

import {TicketREST} from "../entities/ticketREST";
import {AuthService} from "./auth.service";
import {Ticket} from "../entities/ticket";

@Injectable()
export class UtilsService {

  constructor() {
  }

  dateConverter(today: Date){

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
    return todayStr;

  }


}
