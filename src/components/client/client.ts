import {Component, Input, OnInit, Output} from '@angular/core';
import { ModalController, NavController, AlertController} from 'ionic-angular';
import "rxjs/add/observable/merge";
import {AuthService} from "../../services/auth.service";
import {Client} from "../../entities/client";
import {UtilsService} from "../../services/utils.service";

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
              private utilsService: UtilsService,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }


  ngOnInit() {
    this.init();

  }

  private init() {
    let today = new Date();
    this.today = this.utilsService.dateConverter(today);

  }
}

