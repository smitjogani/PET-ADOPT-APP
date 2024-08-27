import { View, Text } from 'react-native'
import React from 'react'

import Header from "../../components/Home/header"

const Home = () => {
  return (
    <View style={{
      padding: 20,
      marginTop: 20
    }}>
      <Header/>
    </View>
  )
}

export default Home