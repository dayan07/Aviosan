import { Injectable } from '@angular/core';
import { AlertController, ToastController,Events } from 'ionic-angular';
import {ErrorModel} from "../entities/errorModel";
import {AlertButton} from "../interfaces/alertButton";

@Injectable()
export class NotifierService {
  canShowToast: boolean = true;
  displayedToast: any;
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, public events: Events) {

  }

  presentToast(message, duration, position) {
    if (this.canShowToast) {
      this.canShowToast = false;
      this.displayedToast = this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,
        dismissOnPageChange: true
      });
      this.displayedToast.present();
      this.displayedToast.onDidDismiss(() => {
        this.canShowToast = true;
        console.log('Dismissed toast');

      });
    } else {
      setTimeout(() => {
        this.presentToast(message, duration, position)
      }, duration);
    }
  }


  onError(err) {
    if (err instanceof ErrorModel) {
      if (err.code == 0) {
        this.presentAlert('Please check your Internet connection');
        return
      }
      this.presentToast(err.message, 1000, 'top');
      return;
    }
    if (String(err.status)) {
      if (err.status == 0 || err.status == 1) {
        this.presentAlert('Please check your Internet connection');
        return;
      }
    }
    if (err === "Please try again later") {
      this.presentAlert(err);
      return;
    }
    if (err && err.errorCode > -1) {
      this.presentAlert(err.errorDescription);
      return;
    }
    else {
      this.presentAlert("Please try again later");
      return;
    }
  }

  showConfirmAlert(title?: string, message?: string, buttons?: AlertButton[]) {
    if(!buttons) {
      buttons = this.createDefaultButtonsforConfirmAlert();
    }
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });
    confirm.present();
  }

  private createDefaultButtonsforConfirmAlert(): AlertButton[] {
    return [
      { text: 'Cancel' },
      { text: 'Agree' }
    ]
  }

  private presentAlert(title?: string, subTitle?: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
