self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: '/notification-badge.png',
      vibrate: [200, 100, 200],
      data: data.data,
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  const orderId = event.notification.data.orderId;
  
  event.waitUntil(
    clients.openWindow(`/orders?tracking=${orderId}`)
  );
});