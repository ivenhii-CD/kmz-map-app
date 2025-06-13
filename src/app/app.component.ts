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
      center: { lat: 48.8584, lng: 2.2945 },
      zoom: 15
    });

    this.kmzLayer = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/sample_eiffel_marker.kml',
      map: this.map,
      preserveViewport: true,
      suppressInfoWindows: false
    });
  }
}
