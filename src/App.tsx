import React from 'react'
import BuptImage from './components/BuptImg'
import MySearchBar from './components/SearchBar'
import Navigation from './screens/NavigationBar'
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
