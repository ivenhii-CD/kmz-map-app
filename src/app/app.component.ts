import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'kmz-map-app'; // ✅ this must be inside the class

  map: any;
  kmzLayer: any;
  showLayer = true;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.initMap();
    }
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 48.8584, lng: 2.2945 }, // Eiffel Tower
      zoom: 15
    });

    this.kmzLayer = new google.maps.KmlLayer({
      url: window.location.origin + '/assets/kml/sample_eiffel_marker.kml',
      map: this.map,
      preserveViewport: true
    });

  }

  toggleKMZ(): void {
    this.kmzLayer.setMap(this.showLayer ? this.map : null);
  }
}
