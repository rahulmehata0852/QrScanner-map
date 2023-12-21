import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './screens/Home'
import Map from './screens/Map'
import { PaperProvider } from 'react-native-paper'

const App = () => {


  return <>

    <PaperProvider>


      <View style={{
        margin: 30,
        marginVertical: 60,
      }}>

        <Home />

      </View>
    </PaperProvider>







  </>
}

export default App

const styles = StyleSheet.create({})