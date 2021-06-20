import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/navigation/Navigator";
import { PermissionProvider } from "./src/context/PermissionsContext";

// aqui van todos los context
const AppState = ({ children }: any) => {
  return <PermissionProvider>{children}</PermissionProvider>;
};

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}
