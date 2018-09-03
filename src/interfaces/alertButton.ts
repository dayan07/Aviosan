export interface AlertButton {
  text: string,
  handler?:	any,
  cssClass?: string,
  //role:'null' or 'cancel'. If a 'cancel' role is on one of the buttons, then if the alert is dismissed by tapping the backdrop,
  // then it will fire the handler from the button with a cancel role.
  role?: string
}
