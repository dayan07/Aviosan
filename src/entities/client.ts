export class Client {
  public firstName: string;
  public lastName: string;
  public dateOfBirth: string;
  public passportNumber: string;
  public dateOfIssue: string;
  public expiryDate: string;
  public email: string;
  public phoneNumber: string;
  public selectedSeatId: number;

  constructor(firstName: string,
              lastName: string,
              dateOfBirth: string,
              passportNumber: string,
              dateOfIssue: string,
              expiryDate: string,
              email: string,
              phoneNumber: string,
              selectedSeatId: number) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.dateOfBirth=dateOfBirth;
    this.passportNumber=passportNumber;
    this.dateOfIssue=dateOfIssue;
    this.expiryDate=expiryDate;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.selectedSeatId=selectedSeatId;

  }
}


