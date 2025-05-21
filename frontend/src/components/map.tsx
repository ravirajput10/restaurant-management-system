"use client";

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { DeliveryLocation } from '@/lib/location-service';

interface MapProps {
  deliveryLocation: DeliveryLocation;
  restaurantLocation: {
    latitude: number;
    longitude: number;
  };
}

export default function Map({ deliveryLocation, restaurantLocation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['places', 'directions'],
      });

      const google = await loader.load();

      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          zoom: 13,
          center: { 
            lat: restaurantLocation.latitude,
            lng: restaurantLocation.longitude,
          },
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: mapInstanceRef.current,
          suppressMarkers: true,
        });
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add restaurant marker
      markersRef.current.push(
        new google.maps.Marker({
          position: {
            lat: restaurantLocation.latitude,
            lng: restaurantLocation.longitude,
          },
          map: mapInstanceRef.current,
          icon: {
            url: '/restaurant-marker.png',
            scaledSize: new google.maps.Size(40, 40),
          },
        })
      );

      // Add delivery marker
      markersRef.current.push(
        new google.maps.Marker({
          position: {
            lat: deliveryLocation.latitude,
            lng: deliveryLocation.longitude,
          },
          map: mapInstanceRef.current,
          icon: {
            url: '/delivery-marker.png',
            scaledSize: new google.maps.Size(40, 40),
          },
        })
      );

      // Draw route
      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: {
          lat: restaurantLocation.latitude,
          lng: restaurantLocation.longitude,
        },
        destination: {
          lat: deliveryLocation.latitude,
          lng: deliveryLocation.longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      });

      directionsRendererRef.current?.setDirections(result);
    };

    initMap();
  }, [deliveryLocation, restaurantLocation]);

  return <div ref={mapRef} className="w-full h-full" />;
}