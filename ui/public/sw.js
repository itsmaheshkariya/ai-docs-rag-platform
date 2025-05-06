self.addEventListener('push', (event) => {
  try {
    const data = event.data?.json() || {};
    const title = data.title || 'Notification';
    const options = {
      body: data.body || 'You have a new message!',
      icon: '/android/android-launchericon-192-192.png', // Update to your app icon
      badge: '/android/android-launchericon-48-48.png', // Optional: Add a badge icon
      actions: [
        {
          action: 'open_url',
          title: 'Open App',
          icon: '/android/android-launchericon-72-72.png', // Optional: Action-specific icon
        },
      ],
    };

    self.registration.showNotification(title, options);
  } catch (error) {
    console.error('Error displaying notification:', error);
  }
});

// Handle 'notificationclick' event
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification

  const targetUrl = '/'; // Define the URL to open (update to your app's homepage or relevant page)

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if the app is already open
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // Open a new window if the app is not already open
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle 'pushsubscriptionchange' event (Handles subscription expiration)
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Push subscription expired, resubscribing...');
  event.waitUntil(
    self.registration.pushManager
      .subscribe(event.oldSubscription.options)
      .then((newSubscription) => {
        // Send the new subscription to the server
        return fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSubscription),
        });
      })
      .catch((error) => {
        console.error('Error during push subscription renewal:', error);
      })
  );
});

// Cache management (optional, to handle caching logic for PWA support)
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
});
