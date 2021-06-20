import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Details from "../screens/Details";
import MapScreen from "../screens/MapScreen";
import PermissionScreen from "../screens/PermissionScreen";
import { PermissionsContext } from "../context/PermissionsContext";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createStackNavigator();

const Navigator = () => {
  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === "undetermined") {
    return <LoadingScreen />;
  }
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      {permissions.locationStatus === "granted" ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
