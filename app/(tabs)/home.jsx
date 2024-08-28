import { View, Text } from 'react-native'
import React from 'react'

import Header from "../../components/Home/header"
import Slider from "../../components/Home/slider"

const Home = () => {
  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Header/>
      <Slider/>
    </View>
  )
}

export default Home