import { websocketService } from './websocket';
import { locationService, type DeliveryLocation } from './location-service';
import { notificationService } from './notification-service';

export interface OrderUpdate {
  orderId: string;
  status: string;
  location?: DeliveryLocation;
  estimatedDelivery?: string;
  message?: string;
}

class OrderTrackingService {
  private activeOrders: Map<string, (update: OrderUpdate) => void> = new Map();

  constructor() {
    websocketService.subscribe('orderUpdate', this.handleOrderUpdate.bind(this));
  }

  async trackOrder(orderId: string, callback: (update: OrderUpdate) => void) {
    this.activeOrders.set(orderId, callback);

    // Subscribe to real-time updates
    websocketService.send('subscribeToOrder', { orderId });

    // Show notification permission request
    await notificationService.init();

    // Subscribe to push notifications
    await notificationService.subscribeToPush();
  }

  stopTracking(orderId: string) {
    this.activeOrders.delete(orderId);
    websocketService.send('unsubscribeFromOrder', { orderId });
  }

  private async handleOrderUpdate(update: OrderUpdate) {
    const callback = this.activeOrders.get(update.orderId);
    if (!callback) return;

    // If the order is being delivered, get the current location
    if (update.status === 'delivering' && !update.location) {
      try {
        const currentLocation = await locationService.getCurrentLocation();
        const deliveryLocation = await locationService.calculateDeliveryInfo(
          currentLocation,
          { latitude: update.location!.latitude, longitude: update.location!.longitude }
        );
        update.location = deliveryLocation;
      } catch (error) {
        console.error('Error getting delivery location:', error);
      }
    }

    // Show notification for important updates
    if (update.message) {
      await notificationService.showNotification({
        title: `Order ${update.orderId} Update`,
        body: update.message,
        data: { orderId: update.orderId },
      });
    }

    callback(update);
  }
}

export const orderTrackingService = new OrderTrackingService();