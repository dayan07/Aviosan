import {Client} from "./client";
export class TicketREST {
  public cost: number;
  public seatId: number;
  public flightId: number;
  public client: Client;


  constructor( cost: number,
               seatId: number,
               flightId: number,
               client: Client) {
    this.cost=cost;
    this.seatId=seatId;
    this.flightId=flightId;
    this.client=client;

  }
}
