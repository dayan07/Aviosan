import { Component, Input, OnInit } from '@angular/core';
import {ModalController, NavController, AlertController, ViewController} from 'ionic-angular';
import { LoginPage } from '../../modals/login/login';
import "rxjs/add/observable/merge";
import {AuthService} from "../../services/auth.service";
import {SearchPage} from "../../modals/search/search";
import {Flight} from "../../entities/flight";

@Component({
  selector: 'header-component',
  templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
  @Input() showCloseButton: boolean = false;
  @Input() isAuth: boolean = false;
  @Input() isHomePage: boolean = false;
  modal: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private viewCtrl:ViewController) {
    this.modal = this.modalCtrl.create(LoginPage);

  }


  ngOnInit() {
    this.init();

  }

  private init() {

  }

  public goToSignInPage() {
    if(!this.isAuth)
    this.modal.present();
    else{
      this.logout();
    }

  }

  private signInPageDismiss(){
     this.viewCtrl.dismiss();
  }
  private logoutMethod(): void{
    this.authService.logOut();
  }

  private logout(): void{
        let confirmAlert = this.alertCtrl.create({
        title: 'Are you sure?',
        message: 'Are you sure you want to exit the app?',
        buttons: [
          {
            text: 'YES',
            handler: () => this.logoutMethod()
          },
          {
            text: 'NO',
            role: 'cancel'
          }
        ]
      });
    confirmAlert.present();

  }

  private search(){
    let modal = this.modalCtrl.create(SearchPage);
    modal.onDidDismiss((data)=>{

    });
    modal.present();





  }
}

