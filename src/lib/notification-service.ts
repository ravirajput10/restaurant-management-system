interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  data?: any;
}

class NotificationService {
  private permission: NotificationPermission = 'default';

  async init() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    this.permission = await Notification.requestPermission();
    return this.permission === 'granted';
  }

  async showNotification({ title, body, icon, data }: NotificationOptions) {
    if (this.permission !== 'granted') {
      const granted = await this.init();
      if (!granted) return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        icon,
        data,
        badge: '/notification-badge.png',
        vibrate: [200, 100, 200],
        requireInteraction: true,
      });
    } catch (error) {
      // Fallback to regular notification if service worker is not available
      new Notification(title, { body, icon });
    }
  }

  async subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });

      // Send subscription to backend
      await fetch('/api/push-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      return true;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();