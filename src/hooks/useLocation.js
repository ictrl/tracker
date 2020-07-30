import React, { useEffect, useState, useContext } from "react";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

const useLocation = (isTracking, callback) => {
  const [err, setErr] = useState(null);
  let subscriber;

  useEffect(() => {
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
        subscriber = sub;
        if (!granted) {
          throw new Error("Location permission not granted");
        }
      } catch (e) {
        setErr(e);
      }
    };

    if (isTracking) startWatching();
    else {
      if (subscriber) {
        subscribe.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [isTracking, callback]);

  return [err];
};

export default useLocation;
