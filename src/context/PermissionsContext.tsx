import React, { createContext, useEffect, useState } from "react";
import {
  PermissionResponse,
  PermissionsState,
} from "../interfaces/LocationInterface";
import * as Location from "expo-location";
import { AppState, Linking } from "react-native";

export const permissionInitState: PermissionsState = {
  locationStatus: "undetermined",
};

type PermisionContextProps = {
  permissions: PermissionsState;
  askLocationPermision: () => void;
  checkLocationPermision: () => void;
};

export const PermissionsContext = createContext({} as PermisionContextProps); // que exporta?

export const PermissionProvider = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    // cuando arranca la aplicación
    checkLocationPermision();
    AppState.addEventListener("change", (state) => {
      if (state !== "active") return;
      checkLocationPermision();
    });

    return () => {
      // esto es por buena practica
      AppState.removeEventListener("change", () => {
        console.log("Remove listener");
      });
    };
  }, []);

  const askLocationPermision = async () => {
    const { status, canAskAgain } =
      await Location.requestForegroundPermissionsAsync();

    if (status === "denied" && !canAskAgain) {
      Linking.openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: status,
    });
  };

  const checkLocationPermision = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    setPermissions({
      ...permissions,
      locationStatus: status,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermision,
        checkLocationPermision,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};
