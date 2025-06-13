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
  showLayer = false; // Default unchecked

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.initMap();
    }
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 4.2105, lng: 101.9758 },
      zoom: 6
    });

    this.kmzLayer = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/24100702_Celcom_LTE_coverage_WM_EM_combined.kmz',
      preserveViewport: true,
      suppressInfoWindows: false
    });

    this.toggleKMZ(); // Set initial visibility
  }

  toggleKMZ(): void {
    this.kmzLayer.setMap(this.showLayer ? this.map : null);
  }
}
