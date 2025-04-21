import { Loader } from '@googlemaps/js-api-loader';

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface DeliveryLocation extends Location {
  estimatedArrival: string;
  distanceInKm: number;
  durationInMinutes: number;
}

// Add a declaration for the global google object
declare global {
  interface Window {
    google: typeof google;
  }
}

class LocationService {
  private geocoder: google.maps.Geocoder | null = null;
  private directionsService: google.maps.DirectionsService | null = null;
  private mapsLoaded: boolean = false;
  private loader: Loader | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize the Google Maps loader
      this.loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places', 'geometry']
      });

      // Load the Google Maps API
      this.initGoogleMaps();
    }
  }

  private async initGoogleMaps() {
    if (!this.loader || typeof window === 'undefined') return;

    try {
      // Load the Google Maps API
      if (!window.google || !window.google.maps) {
        // Using the deprecated method for now, but with a warning suppression
        // @ts-ignore: Deprecated method
        await this.loader.load();
      }

      // At this point, the Google Maps API should be loaded
      if (window.google && window.google.maps) {
        this.geocoder = new google.maps.Geocoder();
        this.directionsService = new google.maps.DirectionsService();
        this.mapsLoaded = true;
      }
    } catch (error) {
      console.error('Error loading Google Maps API:', error);
    }
  }

  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try {
            location.address = await this.getAddressFromCoordinates(location);
          } catch (error) {
            console.error('Error getting address:', error);
          }

          resolve(location);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getAddressFromCoordinates(location: Location): Promise<string> {
    if (!this.mapsLoaded || !this.geocoder) {
      await this.initGoogleMaps();
      if (!this.geocoder) {
        throw new Error('Google Maps API not loaded');
      }
    }

    const response = await this.geocoder.geocode({
      location: { lat: location.latitude, lng: location.longitude }
    });

    if (response?.results[0]) {
      return response.results[0].formatted_address;
    }

    throw new Error('No address found');
  }

  async calculateDeliveryInfo(
    origin: Location,
    destination: Location
  ): Promise<DeliveryLocation> {
    if (!this.mapsLoaded || !this.directionsService) {
      await this.initGoogleMaps();
      if (!this.directionsService) {
        throw new Error('Google Maps API not loaded');
      }
    }

    const response = await this.directionsService.route({
      origin: { lat: origin.latitude, lng: origin.longitude },
      destination: { lat: destination.latitude, lng: destination.longitude },
      travelMode: google.maps.TravelMode.DRIVING,
    });

    const route = response?.routes[0];
    const leg = route?.legs[0];

    if (!leg) {
      throw new Error('No route found');
    }

    const distanceInKm = leg.distance?.value ? leg.distance.value / 1000 : 0;
    const durationInMinutes = leg.duration?.value ? Math.ceil(leg.duration.value / 60) : 0;
    const estimatedArrival = this.calculateEstimatedArrival(durationInMinutes);

    return {
      latitude: destination.latitude,
      longitude: destination.longitude,
      address: leg.end_address,
      estimatedArrival,
      distanceInKm,
      durationInMinutes,
    };
  }

  private calculateEstimatedArrival(durationInMinutes: number): string {
    const arrival = new Date();
    arrival.setMinutes(arrival.getMinutes() + durationInMinutes);
    return arrival.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}

export const locationService = new LocationService();