import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { LocationProps } from "../interfaces/LocationInterface";

export const useLocation = () => {
  // loading
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<LocationProps>({
    latitude: 0,
    longitude: 0,
  });

  const [currentLocation, setCurrentLocation] = useState<LocationProps>({
    latitude: 0,
    longitude: 0,
  });

  const [routeLines, setRouteLines] = useState<LocationProps[]>([]);

  const watchId = useRef<any>();
  const isMounted = useRef(true);

  const getCurrentLocation = async () => {
    // const { locationServicesEnabled } = await Location.getProviderStatusAsync();

    // if (!locationServicesEnabled) {
    //   return {
    //     coords: {
    //       latitude: 0,
    //       longitude: 0,
    //     },
    //   };
    // }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: 4,
    }).catch((e) => {
      return {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      };
    });

    return currentLocation;
  };

  // esto es para evitar cargar cuando se cierra la app
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(({ coords }) => {
      if (!isMounted.current) return;
      const location = { ...coords };

      setInitialPosition(location);
      setRouteLines((routes) => [...routes, location]);
      setCurrentLocation(location);
      setHasLocation(true);
    });
  }, []);

  const followUserLocation = () => {
    if (!isMounted.current) return;
    Location.watchPositionAsync({ distanceInterval: 5 }, ({ coords }) => {
      if (!isMounted.current) return;

      const location = { ...coords };
      setCurrentLocation(location);
      setRouteLines((routes) => [...routes, location]);
    }).then(({ remove }) => {
      watchId.current = {
        remove,
      };
    });
  };

  const stopFollowUser = () => {
    if ("remove" in watchId.current) {
      watchId.current.remove();
    }
  };

  return {
    hasLocation,
    initialPosition,
    currentLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUser,
  };
};
