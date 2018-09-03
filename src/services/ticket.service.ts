import {Injectable} from '@angular/core';
import {CustomHttpService} from './custom-http.service';
import {Environment} from "../environments/environments";

import {TicketREST} from "../entities/ticketREST";
import {AuthService} from "./auth.service";
import {Ticket} from "../entities/ticket";

@Injectable()
export class TicketService {

  constructor(private customHttpService: CustomHttpService,
              private authService: AuthService) {
  }

  getTickets(): Promise<any> {
    return this.authService.getToken()
      .then(token => {
        let params = {
          t: token,
        };
        let url = Environment.mainServerURL + Environment.get_my_tickets;
        return this.customHttpService.get(url, params)
          .then(res => {
            return res.json();
          })
          .catch(err => {
            console.log(err);

          });
      })

  }

  saveTickets(tickets: TicketREST[]): Promise<any> {
    let employeeId;
    return this.authService.getEmployeeId()
      .then((empId) => {
        employeeId = empId;
      })
      .then(() => {
        return this.authService.getToken()
      })
      .then(token => {
        let userToken = token;
        let url=Environment.mainServerURL + Environment.add_tickets+"?t="+userToken+"&empId="+employeeId+"&fl="+tickets[0].flightId;
        let body = [];

        tickets.forEach(ticket => {
          let temp = {

              cost: ticket.cost,
              seat: {
                id: ticket.seatId
              },

              client: {
                firstName: ticket.client.firstName,
                lastName: ticket.client.lastName,
                dateOfBirth: ticket.client.dateOfBirth,
                passportNumber: ticket.client.passportNumber,
                dateOfIssue: ticket.client.dateOfIssue,
                expiryDate: ticket.client.expiryDate,
                email: ticket.client.email,
                phoneNumber: ticket.client.phoneNumber
              },



          };
          body.push(temp);
        });
        //let body = {tickets:arrTickets};
        return this.customHttpService.post(url, body)
          .then(res => {
            return res.json();
          })
          .catch(err => {
            console.log(err);

          });

      })
  }
}




