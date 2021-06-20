import React, { useRef, useEffect, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet } from "react-native";
import { useLocation } from "../hooks/useLocation";
import LoadingScreen from "../screens/LoadingScreen";
import Fab from "./Fab";

interface Props {
  markers?: Marker[];
}

const Maps = ({ markers }: Props) => {
  const {
    hasLocation,
    initialPosition,
    currentLocation,
    routeLines,
    getCurrentLocation,
    followUserLocation,
    stopFollowUser,
  } = useLocation();

  const [showPolylines, setShowPolylines] = useState(true);
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUser();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;

    mapViewRef.current?.animateCamera({
      center: currentLocation,
    });
  }, [currentLocation]);

  const centerPosition = async () => {
    const { coords } = await getCurrentLocation();
    following.current = true;

    mapViewRef.current?.animateCamera({
      center: coords,
      zoom: 16
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        ref={(el) => (mapViewRef.current = el!)}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}
      >
        {showPolylines && (
          <Polyline
            coordinates={routeLines}
            strokeColor="blue"
            strokeWidth={7}
          />
        )}

        {/* <Marker
          image={require("../assets/custom-marker.png")}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={"Esto es in t"}
          description={"Esto es desc"}
        /> */}
      </MapView>
      <Fab onPress={centerPosition} iconName={"pin"} style={styles.button} />
      <Fab
        onPress={() => setShowPolylines(!showPolylines)}
        iconName={"brush"}
        style={{ ...styles.button, bottom: 80 }}
      />
    </>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  button: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
