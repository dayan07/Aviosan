export class Ticket {
  public id: number;
  public cost: number;
  public seatLevelClass: string;
  public seatRow: number;
  public seatNumber: string;
  public flightName: string;
  public flightDate: Date;


  constructor(id:number,
              cost:number,
              seatLevelClass: string,
              seatRow: number,
              seatNumber: string,
              flightName: string,
              flightDate: Date) {
    this.id=id;
    this.cost=cost;
    this.seatLevelClass=seatLevelClass;
    this.seatRow=seatRow;
    this.seatNumber=seatNumber;
    this.flightName=flightName;
    this.flightDate = flightDate;

  }
}

