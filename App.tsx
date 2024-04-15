import React from 'react'
import BuptImage from './src/BuptImg'
import MySearchBar from './src/SearchBar'
import Navigation from './src/NavigationBar'
import { View, StyleSheet } from 'react-native'

function App() {
  return (
    <View style={styles.container}>
      <MySearchBar />
      <Navigation />
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
