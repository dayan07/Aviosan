import {Component, Input, OnInit, Output} from '@angular/core';
import { ModalController, NavController, AlertController} from 'ionic-angular';
import "rxjs/add/observable/merge";
import {AuthService} from "../../services/auth.service";
import {Client} from "../../entities/client";

@Component({
  selector: 'client-component',
  templateUrl: 'client.html'
})
export class ClientComponent implements OnInit {
  @Input() client: Client;
  @Input() seatList: any[];
  @Input() existClient: boolean = false;
  today: string;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }


  ngOnInit() {
    this.init();

  }

  private init() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let mmStr;
    let ddStr;
    let todayStr;
    if(dd<10)
    {
      ddStr='0'+dd;
    }

    if(mm<10)
    {
      mmStr='0'+mm;
    }
    todayStr = yyyy+'-'+mmStr+'-'+ddStr;
    this.today = todayStr;
  }
}

