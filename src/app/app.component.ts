import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoogleMapsLoaderService } from './google-maps-loader.service';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  map: any;
  activeTab: 'celcom' | 'digi' = 'celcom';

  celcomLayer1: any;
  celcomLayer2: any;
  digiLayer1: any;
  digiLayer2: any;

  showCelcomLayer1 = true;
  showCelcomLayer2 = true;
  showDigiLayer1 = true;
  showDigiLayer2 = true;

  constructor(
    private mapsLoader: GoogleMapsLoaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsLoader.load()
        .then(() => this.initMap())
        .catch(err => console.error('Google Maps load error:', err));
    }
  }

  initMap(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 4.2105, lng: 101.9758 },
      zoom: 15,
    });

    const input = document.getElementById('search-input') as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      fields: ['geometry', 'name'],
      componentRestrictions: { country: 'my' }
    });
    autocomplete.bindTo('bounds', this.map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        alert('No details available for input.');
        return;
      }

      this.map.setCenter(place.geometry.location);
    });

    // Define KMZ layers
    this.celcomLayer1 = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/24100702_Celcom_LTE_coverage_WM_EM_combined.kmz',
      preserveViewport: true,
    });
    this.celcomLayer2 = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/24100702_Celcom_LTE_coverage_WM_EM_combined.kmz',
      preserveViewport: true,
    });

    this.digiLayer1 = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/24100702_Celcom_LTE_coverage_WM_EM_combined.kmz',
      preserveViewport: true,
    });
    this.digiLayer2 = new google.maps.KmlLayer({
      url: 'https://ivenhii-cd.github.io/kmz-map-app/24100702_Celcom_LTE_coverage_WM_EM_combined.kmz',
      preserveViewport: true,
    });

    this.updateVisibleLayers();
  }

  setTab(tab: 'celcom' | 'digi'): void {
    this.activeTab = tab;

    if (tab === 'celcom') {
      this.showCelcomLayer1 = true;
      this.showCelcomLayer2 = true;
    } else {
      this.showDigiLayer1 = true;
      this.showDigiLayer2 = true;
    }

    this.updateVisibleLayers();
  }

  toggleLayer(layer: string): void {
    switch (layer) {
      case 'celcomLayer1':
        this.showCelcomLayer1 = !this.showCelcomLayer1;
        break;
      case 'celcomLayer2':
        this.showCelcomLayer2 = !this.showCelcomLayer2;
        break;
      case 'digiLayer1':
        this.showDigiLayer1 = !this.showDigiLayer1;
        break;
      case 'digiLayer2':
        this.showDigiLayer2 = !this.showDigiLayer2;
        break;
    }

    this.updateVisibleLayers();
  }

  updateVisibleLayers(): void {
    if (!this.map) return;

    this.celcomLayer1?.setMap(null);
    this.celcomLayer2?.setMap(null);
    this.digiLayer1?.setMap(null);
    this.digiLayer2?.setMap(null);

    if (this.activeTab === 'celcom') {
      if (this.showCelcomLayer1) this.celcomLayer1.setMap(this.map);
      if (this.showCelcomLayer2) this.celcomLayer2.setMap(this.map);
    } else {
      if (this.showDigiLayer1) this.digiLayer1.setMap(this.map);
      if (this.showDigiLayer2) this.digiLayer2.setMap(this.map);
    }
  }
}
