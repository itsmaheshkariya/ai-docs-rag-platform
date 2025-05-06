"use client";

import { useEffect } from "react";

const publicVapidKey = "BFkiRnv-m6niDGvW_lHhesR2uorwsq4__LDFqQ-LIgTtVtDSseKRgovhbSv4dNc8qMMwIH4uQ02m4s0h3mDeTjo";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function ServiceWorkerInitializer() {
  useEffect(() => {
    // Function to request permissions for notifications and microphone
    const requestPermissions = async () => {
      try {
        // Request Notification Permission
        const notificationPermission = await Notification.requestPermission();
        if (notificationPermission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.warn("Notification permission denied or default.");
        }

        // Request Microphone Permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone permission granted.", stream);

        // Trigger Audio Playback (Requires User Interaction)
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1); // Stop after 100ms
        console.log("Audio playback triggered.");
      } catch (error) {
        console.error("Error requesting permissions or triggering audio playback:", error);
      }
    };

    // Request permissions when component mounts
    requestPermissions();

    // Register Service Worker and Push Subscription
    if ("serviceWorker" in navigator && "PushManager" in window) {
      console.log("Service worker and PushManager supported. Waiting for service worker...");

      navigator.serviceWorker.register("/sw.js").then(async (registration) => {
        console.log("Service Worker registered successfully:", registration);

        const readyRegistration = await navigator.serviceWorker.ready;
        console.log("Service Worker is ready. Attempting to subscribe...");

        // Push Subscription
        try {
          const subscription = await readyRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
          });
          console.log("Push subscription created:", subscription);

          // Send subscription to the backend
          await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          });
        } catch (error) {
          console.error("Failed to create push subscription:", error);
        }
      }).catch((error) => {
        console.error("Service worker registration failed:", error);
      });
    } else {
      console.error("Service Worker or PushManager not supported.");
    }
  }, []);

  return null;
}