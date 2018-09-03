import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HTTP } from "@ionic-native/http";
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { OrderPopoverPage } from '../popovers/orderPopoverPage/orderPopoverPage';
import { StorageService } from "../services/storage.service";
import { FlightsService } from '../services/flights.service';
import { TicketService } from '../services/ticket.service';

import {NewClientPage} from "../modals/new-client/new-client";
import {OrderPage} from "../modals/order/order";
import { LoginPage } from '../modals/login/login';
import { SignUpPage } from '../modals/sign-up/sign-up';
import { AuthService } from '../services/auth.service';

import { CustomHttpService } from '../services/custom-http.service';
import { MyTicketsPage } from '../pages/my_tickets/my_tickets';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallTaxi } from "../pages/call_taxi/call_taxi";

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { HeaderComponent } from '../components/header/header';

import { PhoneNumberMaskDirective } from'../directives/phone-number-mask/phone-number-mask';

import {NotifierService} from "../services/notifier.service";
import {ClientComponent} from "../components/client/client";
import {SearchPage} from "../modals/search/search";


@NgModule({
  declarations: [
    MyApp,
    PhoneNumberMaskDirective,
    LoginPage,
    NewClientPage,
    SignUpPage,
    OrderPage,
    SearchPage,
    MyTicketsPage,
    HomePage,
    CallTaxi,
    TabsPage,
    HeaderComponent,
    ClientComponent,
    OrderPopoverPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'airport',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NewClientPage,
    SignUpPage,
    SearchPage,
    OrderPage,
    CallTaxi,
    MyTicketsPage,
    HomePage,
    TabsPage,
    OrderPopoverPage
  ],
  providers: [
    FlightsService,
    TicketService,
    CustomHttpService,
    AuthService,
    NotifierService,
    StorageService,
    HTTP,
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    GoogleAnalytics,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
