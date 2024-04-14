import React from 'react'
import BuptImage from './src/BuptImg'
import MySearchBar from './src/SearchBar'
import MapScreen from './src/Map'
import MyTabs from './src/NavigationBar'
import { View, StyleSheet } from 'react-native'

function App() {
  return (
    <View style={styles.container}>
      <MySearchBar />
      <MapScreen />
      <MyTabs />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default App
