import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BlackButton from "../components/BlackButton";
import { PermissionsContext } from "../context/PermissionsContext";

const PermissionScreen = () => {
  const { permissions, askLocationPermision } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Es necesario usar el GPS</Text>
      <BlackButton title="Permitir" onPress={askLocationPermision} />
      <Text style={{marginTop: 20}}>{JSON.stringify(permissions, null, 3)}</Text>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});
