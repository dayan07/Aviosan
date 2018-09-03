export class UserInfo {
  constructor(
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public passportNumber: string,
    public dateOfIssue: Date,
    public expiryDate: Date,
    public email: string,
    public phoneNumber: string,
    public password: string,
    public confirmPassword: string

  ) {  }


}
