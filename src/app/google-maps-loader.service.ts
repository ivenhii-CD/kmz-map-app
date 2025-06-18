import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsLoaderService {
  private apiKey = 'AIzaSyAtFCnSSEqVfhuFrdcQ9khRIcxBGJNJVQQ'; // Replace with your real API key
  private loaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  load(): Promise<void> {
    // Only run this in the browser
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    if (this.loaded || typeof (window as any)['google'] !== 'undefined') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const scriptId = 'google-maps-script';
      if (document.getElementById(scriptId)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.loaded = true;
        resolve();
      };

      script.onerror = () => reject('Google Maps script failed to load.');

      document.body.appendChild(script);
    });
  }
}
