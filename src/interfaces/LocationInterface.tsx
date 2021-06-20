import * as Location from 'expo-location';
export interface PermissionResponse {
  status: "granted" | "undetermined" | "denied";
  granted: boolean;
  expires: "never" | number;
  canAskAgain: boolean;
  permissions: {
    // an object with an entry for each permission requested
    [permissionType: string /* PermissionType */]: PermissionInfo;
  };
}

interface PermissionInfo {
  status: "granted" | "undetermined" | "denied";
  granted: boolean;
  expires: "never" | number;
  canAskAgain: boolean;
  ios?: {
    scope: "whenInUse" | "always";
  };
  android?: {
    scope: "fine" | "coarse" | "none";
  };
}

export interface PermissionsState {
  locationStatus:  "granted" | "undetermined" | "denied";
}

export interface LocationProps {
  latitude: number
  longitude: number
}