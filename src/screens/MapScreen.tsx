import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";
import Maps from "../components/Maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Maps />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
