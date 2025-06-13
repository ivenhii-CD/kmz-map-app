import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'kmz-map-app';
  map: any;
  kmzLayer: any;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.initMap();
    }
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 37.422, lng: -122.084 }, // Google HQ area
      zoom: 16
    });


    this.kmzLayer = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/westcampus.kml',
      map: this.map,
      preserveViewport: true,
      suppressInfoWindows: false
    });
  }
}
