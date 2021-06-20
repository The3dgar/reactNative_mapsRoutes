import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={{
      flex:1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ActivityIndicator size={50} color="#dd8800"/>
      
    </View>
  )
}

export default LoadingScreen
