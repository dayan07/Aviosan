import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, GoogleMapsAnimation, Marker,
  ILatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'page-call-taxi',
  templateUrl: 'call_taxi.html'
})
export class CallTaxi {

  isAuth: boolean = false;
  map: GoogleMap;
  yourLocationMarker: Marker;
  Minsk1LocMarker: Marker;
  IntMinskLocMarker: Marker;
  BrestLocMarker: Marker;
  VitebskLocMarker: Marker;
  HrodnaLocMarker: Marker;
  HomelLocMarker: Marker;
  MogilevLocMarker: Marker;
  selectIcon: boolean = false;
  areLocMarkerSelected: boolean[];

  private readonly Minsk1Position: ILatLng = {
  lat: 53.8620325,
  lng: 27.5287771
  };
  private readonly IntMinskPosition: ILatLng = {
    lat: 53.8864644,
    lng: 27.9711952
  };
  private readonly BrestPosition: ILatLng = {
    lat: 52.113091,
    lng: 23.89992899999993
  };
  private readonly VitebskPosition: ILatLng = {
    lat: 55.12805729999999,
    lng: 30.354459599999927
  };
  private readonly HrodnaPosition: ILatLng = {
    lat: 53.6016649,
    lng: 24.055000000000064
  };
  private readonly HomelPosition: ILatLng = {
    lat: 52.5255007,
    lng: 31.0150896
  };
  private readonly MogilevPosition: ILatLng = {
    lat: 53.9582388,
    lng: 30.09785110000007
  };

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private authService: AuthService) {
    this.authService.getAuthBehaviorSubject()
      .subscribe((isAuth) => {
        this.isAuth = isAuth;
      })
    this.areLocMarkerSelected = [];
    for (let i: number = 0; i < 7; i++) {
      this.areLocMarkerSelected[i] = false;
    }

  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadMap(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap(latitude, longitude) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 5
      }
    };

    if (cordova) {
      this.map = GoogleMaps.create('map_canvas', mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          this.yourLocationMarker = this.map.addMarkerSync({
            title: 'You are here!',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: latitude,
              lng: longitude
            }
          });
          this.setMarker("Minsk 1 airport", this.Minsk1Position);
          this.setMarker("National Airport Minsk", this.IntMinskPosition);
          this.setMarker("Brest airport", this.BrestPosition);
          this.setMarker("Vitebsk east airport", this.VitebskPosition);
          this.setMarker("Hrodna airport", this.HrodnaPosition);
          this.setMarker("Homel airport", this.HomelPosition);
          this.setMarker("Mogilev airport", this.MogilevPosition);
        })
        .catch((error) => console.log(error));
    }
  }

    clickMarker(marker: Marker,markersNumber: number ){
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        if(this.areLocMarkerSelected[markersNumber]){
          marker.setIcon({
            url: 'assets/icon/paper-plane-o.png',
            size: {
              width: 15,
              height: 12
            }
          });
          this.areLocMarkerSelected[markersNumber] = false;
          return;
        }
        if(this.areAllMarkersDeselected()) {
          marker.setIcon({
            url: 'assets/icon/paper-plane.png',
            size: {
              width: 15,
              height: 12
            }
          });
          this.areLocMarkerSelected[markersNumber] = true;




        }
      });
    }

  areAllMarkersDeselected(): boolean{
    for(let locMarkerSelected of this.areLocMarkerSelected ) {
      if (locMarkerSelected) {
        return false;
      }
    }
    return true;
  }

  setMarker(title:string, position:ILatLng){
    let marker: Marker = this.map.addMarkerSync({
      title: 'Airport',
      icon: {
        url: 'assets/icon/paper-plane-o.png',
        size: {
          width: 15,
          height: 12
        }
      },
      animation: 'DROP',
      position: {
        lat: 53,
        lng: 27
      }
    });
    switch (title){
      case "Minsk 1 airport":
        this.Minsk1LocMarker = marker;
        this.Minsk1LocMarker.setTitle(title);
        this.Minsk1LocMarker.setPosition(position);
        this.clickMarker(this.Minsk1LocMarker, 0);
        break;
      case "National Airport Minsk":
        this.IntMinskLocMarker = marker;
        this.IntMinskLocMarker.setTitle(title);
        this.IntMinskLocMarker.setPosition(position);
        this.clickMarker(this.IntMinskLocMarker, 1);
        break;
      case "Brest airport":
        this.BrestLocMarker = marker;
        this.BrestLocMarker.setTitle(title);
        this.BrestLocMarker.setPosition(position);
        this.clickMarker(this.BrestLocMarker, 2);
        break;
      case "Vitebsk east airport":
        this.VitebskLocMarker = marker;
        this.VitebskLocMarker.setTitle(title);
        this.VitebskLocMarker.setPosition(position);
        this.clickMarker(this.VitebskLocMarker, 3);
        break;
      case "Hrodna airport":
        this.HrodnaLocMarker = marker;
        this.HrodnaLocMarker.setTitle(title);
        this.HrodnaLocMarker.setPosition(position);
        this.clickMarker(this.HrodnaLocMarker, 4);
        break;
      case "Homel airport":
        this.HomelLocMarker = marker;
        this.HomelLocMarker.setTitle(title);
        this.HomelLocMarker.setPosition(position);
        this.clickMarker(this.HomelLocMarker, 5);
        break;
      case "Mogilev airport":
        this.MogilevLocMarker = marker;
        this.MogilevLocMarker.setTitle(title);
        this.MogilevLocMarker.setPosition(position);
        this.clickMarker(this.MogilevLocMarker, 6);
        break;
    }
  }
}

declare var cordova: any;

