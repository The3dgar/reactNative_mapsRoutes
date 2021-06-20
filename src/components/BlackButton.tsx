import React from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Text,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const BlackButton = ({ onPress, title, style = {} }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ ...(style as any), ...styles.blackButton }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BlackButton;

const styles = StyleSheet.create({
  blackButton: {
    height: 45,
    width: 200,
    backgroundColor: "#000",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    elevation: 6,
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
