
export class Flight {
  public id: number;
  public name: string;
  public date: Date;
  public status: string;
  public availableSeatsCount: number;
  public startPoint: string;
  public endPoint: string;
  public seatList: any [];

  constructor(id:number, name:string, date: Date, status: string, availableSeatsCount:number, startPoint:string, endPoint:string, seatList: any [] ) {
    this.id=id;
    this.name=name;
    this.date=date;
    this.status=status;
    this.availableSeatsCount=availableSeatsCount;
    this.startPoint=startPoint;

    this.endPoint=endPoint;
    this.seatList = seatList;
  }
}
